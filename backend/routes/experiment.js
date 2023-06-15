module.exports = function (app, db) {
    app.post("/experiment", async (req, res) => {
        try {
            // noinspection SqlInsertValues
            db.prepare(`insert
                        into
                            experiment
                        (started, subject_id, device_id, session_type, subject_age, subject_sex, subject_netflix_familiarity, subject_selected_content, content_continuation, settings, urls)
                        values
                            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                .run(req.body.started, req.body.subject_id, req.body.device_id,req.body.session_type, req.body.subject_age,
                    req.body.subject_sex, req.body.subject_netflix_familiarity, req.body.subject_selected_content,
                    req.body.content_continuation, JSON.stringify(req.body.settings), JSON.stringify(req.body.urls));

            const last_id = db.prepare('select id from experiment order by id desc limit 1').get();

            res.status(201).json({msg: last_id});
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });

    app.patch("/experiment", async (req, res) => {
        try {
            db.prepare('update experiment set ended = ? where id = ?').run(req.body.ended, req.body.experiment_id)

            console.log(req.body)
            res.status(201).json({msg: "Experiment updated"});
        } catch (e) {
            console.log(e)
            res.status(500).json({ msg: "Failed" });
        }
    });

    app.get("/experiment", async (req, res) => {
        res.status(200).json({msg: "OK"});
    });
};
