module.exports = function (app, db) {
  app.get("/results", async (req, res) => {
    //Get video info +  playback data + assessments + bitrate changes

    try {
      let userCourse = [];

      const rows = db.prepare('select * from experiment').all();

      // noinspection LoopStatementThatDoesntLoopJS
      for (const item of rows) {
        const user = {
          id: item.id,
          started: item.started,
          ended: item.ended,
          video_limit: item.video_limit,
          subject_id: item.subject_id,
          settings: item.settings,
          urls: item.urls,
          video: [],
        };

        const videos = db.prepare('select * from video where experiment_id = ?').all(item.id);

        for (let i = 0; i < videos.length; i++) {
          let all_data = videos[i];

          all_data.playback_data = db.prepare('select * from playback_data where video_id = ?').all(videos[i].id);

          user.video.push(all_data);
        }

        userCourse.push(user);
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200)
      res.end(JSON.stringify(userCourse, null, 3));
    } catch (e) {
      console.log(e);
    }
  });
};
