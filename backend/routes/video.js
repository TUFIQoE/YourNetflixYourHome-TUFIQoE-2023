module.exports = function (app, db) {
  app.post("/video", function (req, res) {
    try {
      // noinspection SqlInsertValues
      db.prepare('insert into video (started, experiment_id, url) values (?, ?, ?)')
          .run(req.body.started, req.body.experiment_id.id, req.body.url);

      // noinspection SqlInsertValues
      const video_id = db.prepare('select id from video order by id desc limit 1').get();

      res.status(201).json({ video_id: video_id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Failed" });
    }
  });

  app.patch("/video", function (req, res) {
      try {
        db.prepare('update video set ended = ? where id = ?')
            .run(req.body.ended, req.body.video_id.id)

        res.status(201).json({ msg: "Video updated" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Failed" });
      }
  });
};
