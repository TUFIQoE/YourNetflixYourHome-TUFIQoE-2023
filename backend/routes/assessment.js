module.exports = function (app, db) {
    app.post("/assessment", async (req, res) => {
        try {
            // noinspection SqlInsertValues
            db.prepare(`insert
                        into
                            assessment
                            (video_id, multitasking, value, description, started, timestamp, duration)
                        values
                            (?, ?, ?, ?, ?, ?, ?)`)
                .run(req.body.video_id, req.body.multitasking, req.body.quality.value, req.body.quality.description,
                    req.body.quality.started, req.body.timestamp, req.body.quality.duration);

            res.status(201).json({ msg: "Assessment created" });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });
};
