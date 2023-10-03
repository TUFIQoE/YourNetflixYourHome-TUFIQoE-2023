module.exports = function (app, db) {
    app.post("/assessment", async (req, res) => {
        try {
            // noinspection SqlInsertValues
            db.prepare(`insert
                        into
                            assessment
                            (video_id,  quality_value, quality_description, started, duration, timestamp)
                        values
                            (?, ?, ?, ?, ?, ?)`)
                .run(req.body.video_id.id, req.body.value, req.body.description, req.body.started, req.body.duration, req.body.timestamp);

            res.status(201).json({ msg: "Assessment created" });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });
};
