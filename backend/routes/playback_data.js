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
          .run(req.body.video_id.id, req.body.playback_data.buffering_bitrate_audio,
	      req.body.playback_data.buffering_bitrate_video, req.body.playback_data.buffering_state,
	      req.body.playback_data.buffering_vmaf, req.body.playback_data.duration,
	      req.body.playback_data.framerate, req.body.playback_data.player_state,
	      req.body.playback_data.playing_bitrate_video, req.body.playback_data.playing_bitrate_audio,
              req.body.playback_data.playing_vmaf, req.body.playback_data.position,
	      req.body.playback_data.rendering_state, req.body.playback_data.resolution,
              req.body.playback_data.segment_position, req.body.playback_data.timestamp,
	      req.body.playback_data.total_corrupted_frames, req.body.playback_data.total_dropped_frames,
	      req.body.playback_data.total_frames, req.body.playback_data.volume);

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

