library(latex2exp)
library(RSQLite)
library(dplyr)

db_name <- "database"

mydb <- dbConnect(RSQLite::SQLite(), sprintf("%s.db", db_name))
acr <- dbGetQuery(mydb, 'SELECT quality_value AS "acr" FROM assessment')
testers_data <- dbGetQuery(mydb, 'SELECT experiment.secret_word, video.experiment_id, video.id as "video_id" FROM video INNER JOIN experiment ON video.experiment_id = experiment.id')

avg_resolution_sqrts <- data.frame(matrix(ncol = 2, nrow = 0))

for (i in 1:nrow(testers_data)) {
  timestamps <- dbGetQuery(mydb, sprintf("SELECT timestamp FROM assessment WHERE video_id = %s", testers_data$video_id[i]))
  
  resolutions <- dbGetQuery(mydb, sprintf("SELECT resolution FROM playback_data WHERE video_id = %s AND timestamp <= '%s'",
                                          testers_data$video_id[i],
                                          timestamps$timestamp[1]))
  
  resolutions_sqrt <- data.frame(resolution_sqrt = numeric(0))
  
  for (resolution in resolutions$resolution) {
    width = as.integer(strsplit(resolution, "x")[[1]][1])
    height = as.integer(strsplit(resolution, "x")[[1]][2])
    resolution_sqrt = sqrt(width * height)
    
    if (!is.na(resolution_sqrt) & resolution_sqrt > 10) {
      resolutions_sqrt <- rbind(resolutions_sqrt, data_frame(resolution_sqrt=resolution_sqrt))
    }
  }
  
  avg_resolution_sqrt <- data_frame(resolution_sqrt=mean(resolutions_sqrt$resolution_sqrt))
  
  avg_resolution_sqrt <- data.frame(tester_id = testers_data$secret_word[i], experiment_id = testers_data$experiment_id[i], video_id = testers_data$video_id[i], avg_resolution_sqrt)
  
  avg_resolution_sqrts <- rbind(avg_resolution_sqrts, avg_resolution_sqrt)
  
  for (j in 2:nrow(timestamps)) {
    resolutions <- dbGetQuery(mydb, sprintf("SELECT resolution FROM playback_data WHERE video_id = %s AND timestamp BETWEEN '%s' AND '%s'",
                                            testers_data$video_id[i],
                                            timestamps$timestamp[j - 1],
                                            timestamps$timestamp[j]))
    
    resolutions_sqrt <- data.frame(resolution_sqrt = numeric(0))
    
    for (resolution in resolutions$resolution) {
      width = as.integer(strsplit(resolution, "x")[[1]][1])
      height = as.integer(strsplit(resolution, "x")[[1]][2])
      resolution_sqrt = sqrt(width * height)
      
      if (!is.na(resolution_sqrt) & resolution_sqrt > 10) {
        resolutions_sqrt <- rbind(resolutions_sqrt, data_frame(resolution_sqrt=resolution_sqrt))
      }
    }
    
    avg_resolution_sqrt <- data_frame(resolution_sqrt=mean(resolutions_sqrt$resolution_sqrt))
    
    avg_resolution_sqrt <- data.frame(tester_id = testers_data$secret_word[i], experiment_id = testers_data$experiment_id[i], video_id = testers_data$video_id[i], avg_resolution_sqrt)
    
    avg_resolution_sqrts <- rbind(avg_resolution_sqrts, avg_resolution_sqrt)
  }
}

dbDisconnect(mydb)

acr_resolution <- data.frame(tester_id = avg_resolution_sqrts$tester_id, experiment_id = avg_resolution_sqrts$experiment_id, video_id = avg_resolution_sqrts$video_id, acr = acr$acr, resolution = avg_resolution_sqrts$resolution_sqrt)

acr_resolution <- na.omit(acr_resolution)

size_res <- (max(acr_resolution$resolution, na.rm = TRUE) - 
               min(acr_resolution$resolution, na.rm = TRUE))/15

mos_resolution_grouped <- acr_resolution %>%
  mutate(resolution_group = floor(resolution / size_res)) %>%
  group_by(resolution_group) %>%
  summarise(resolution_value = mean(resolution, na.rm = TRUE), mos = mean(acr), n = n())

final_plot <- mos_resolution_grouped %>%
  ggplot(aes(resolution_value, mos, size = n)) +
  geom_point() +
  geom_smooth(method=lm, se=FALSE, col='blue', size=0.5) +
  annotate(geom="text", x=1000, y=2.5, hjust = 0, vjust = 0,
           label = sprintf("Kor. = %.2f\nWart. p = %.2e",
                           cor(mos_resolution_grouped$resolution_value, mos_resolution_grouped$mos),
                           cor.test(mos_resolution_grouped$resolution_value, mos_resolution_grouped$mos)$p.value)) +
  labs(x = TeX("Resolution $\\sqrt{res_x \\times res_y}$"),
       y = "MOS") +
  scale_size_continuous(name = "# Oceny") +
  theme_bw()

print(final_plot)

ggsave(sprintf("./plots/corelation_res_sqrt_%s.pdf", db_name), final_plot, width = 2000, height = 1000, units = "px")
