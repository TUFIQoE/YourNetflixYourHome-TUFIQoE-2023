library(RSQLite)
library(dplyr)

db_names <- list("database", "database_no_multitasking", "database_multitasking")

create_plot <- function(db_name) {
  mydb <- dbConnect(RSQLite::SQLite(), sprintf("%s.db", db_name))
  acr <- dbGetQuery(mydb, 'SELECT quality_value AS "acr" FROM assessment')
  testers_data <- dbGetQuery(mydb, 'SELECT experiment.secret_word, video.experiment_id, video.id as "video_id" FROM video INNER JOIN experiment ON video.experiment_id = experiment.id')
  
  avg_vmafs <- data.frame(matrix(ncol = 2, nrow = 0))
  
  for (i in 1:nrow(testers_data)) {
    timestamps <- dbGetQuery(mydb, sprintf("SELECT timestamp FROM assessment WHERE video_id = %s", testers_data$video_id[i]))
    
    avg_vmaf <- dbGetQuery(mydb, sprintf("SELECT AVG(playing_vmaf) AS avg_vmaf FROM playback_data WHERE video_id = %s AND timestamp <= '%s'",
                                    testers_data$video_id[i],
                                    timestamps$timestamp[1]))
    
    avg_vmaf <- data.frame(tester_id = testers_data$secret_word[i], experiment_id = testers_data$experiment_id[i], video_id = testers_data$video_id[i], avg_vmaf)
  
    avg_vmafs <- rbind(avg_vmafs, avg_vmaf)
  
    for (j in 2:nrow(timestamps)) {
      avg_vmaf <- dbGetQuery(mydb, sprintf("SELECT AVG(playing_vmaf) AS avg_vmaf FROM playback_data WHERE video_id = %s AND timestamp BETWEEN '%s' AND '%s'",
                                      testers_data$video_id[i],
                                      timestamps$timestamp[j - 1],
                                      timestamps$timestamp[j]))
  
      avg_vmaf <- data.frame(tester_id = testers_data$secret_word[i], experiment_id = testers_data$experiment_id[i], video_id = testers_data$video_id[i], avg_vmaf)
      avg_vmafs <- rbind(avg_vmafs, avg_vmaf)
    }
  }
  
  dbDisconnect(mydb)
  
  acr_vmaf <- data.frame(tester_id = avg_vmafs$tester_id, experiment_id = avg_vmafs$experiment_id, video_id = avg_vmafs$video_id, acr = acr$acr, vmaf = avg_vmafs$avg_vmaf)
  
  mos_vmaf_grouped <- acr_vmaf %>%
    mutate(vmaf_group = floor(vmaf / 3)) %>%
    group_by(vmaf_group) %>%
    summarise(vmaf_value = mean(vmaf, na.rm = TRUE), mos = mean(acr), n = n())
  
  final_plot <- mos_vmaf_grouped %>%
    ggplot(aes(vmaf_value, mos, size = n)) +
    geom_point() +
    geom_smooth(method=lm, se=FALSE, col='blue', size=0.5) +
    annotate(geom="text", x=65, y=2.0, hjust = 0, vjust = 0,
             label = sprintf("Kor. = %.2f\nWart. p = %.2e",
                             cor(mos_vmaf_grouped$vmaf_value, mos_vmaf_grouped$mos),
                             cor.test(mos_vmaf_grouped$vmaf_value, mos_vmaf_grouped$mos)$p.value)) +
    labs(x = "VMAF",
         y = "MOS") +
    scale_size_continuous(name = "# Oceny") +
    theme_bw()
  
  print(final_plot)
  
  ggsave(sprintf("./plots/corelation_%s.pdf", db_name), final_plot, width = 2000, height = 1000, units = "px")
}

for (db_name in db_names) {
  create_plot(db_name)
}

