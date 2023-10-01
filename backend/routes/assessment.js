module.exports = function (app, db) {
    app.post("/assessment", async (req, res) => {
        try {
            // noinspection SqlInsertValues
            db.prepare(`insert
                        into
                            assessment
                            (video_id, quality_value, quality_description, started, duration, timestamp)
                        values
                            (?, ?, ?, ?, ?, ?)`)
                .run(req.body.video_id.id, req.body.multitasking.value, req.body.multitasking.description,
                    req.body.multitasking.started, req.body.multitasking.duration, req.body.quality.value,
                    req.body.quality.description, req.body.quality.started, req.body.quality.duration, req.body.timestamp);

            res.status(201).json({ msg: "Assessment created" });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });
};
