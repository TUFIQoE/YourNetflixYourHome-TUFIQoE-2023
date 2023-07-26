module.exports = function (app, db) {
  app.post("/playback_data", async (req, res) => {
    try {
      // Manage playback data processed by regular expressions
      // noinspection SqlInsertValues
      db.prepare(`insert
                  into
                    playback_data
                  (video_id, buffering_bitrate_audio, buffering_bitrate_video, buffering_state, buffering_vmaf, duration, framerate, player_state, playing_bitrate_video, playing_bitrate_audio, playing_vmaf, position, rendering_state, resolution, segment_position, timestamp, total_corrupted_frames, total_dropped_frames, total_frames, volume)
                  values
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
          .run(req.body.video_id.id, req.body.buffering_bitrate_audio, req.body.buffering_bitrate_video,
              req.body.buffering_state, req.body.buffering_vmaf, req.body.duration, req.body.framerate,
              req.body.player_state, req.body.playing_bitrate_video, req.body.playing_bitrate_audio,
              req.body.playing_vmaf, req.body.position, req.body.rendering_state, req.body.resolution,
              req.body.segment_position, req.body.timestamp, req.body.total_corrupted_frames,
              req.body.total_dropped_frames, req.body.total_frames, req.body.volume);

      // Manage raw string with nerd statistics
      // noinspection SqlInsertValues
      db.prepare('insert into archive (video_id, data, timestamp) values (?, ?, ?)')
          .run(req.body.video_id.id, JSON.stringify(req.body.archive.data), req.body.archive.timestamp)

      res.status(201).json({ msg: "OK" });
    } catch (e) {
      console.log(e)
      res.status(500).json({ msg: "Failed" });
    }
  });
};
