module.exports = function (app, db, links) {
    app.post("/experiment", async (req, res) => {
        try {
            // noinspection SqlInsertValues
	    let link_id = db.prepare('select id + 1 as id from experiment order by id desc limit 1').get();
	    
	    if (link_id === undefined) {
		    link_id = {id: 1};
	    };

	    const link = links.prepare('select link from links where id = ?').get(link_id.id);

            db.prepare(`insert
                        into
                            experiment
                        (secret_word, started, subject_age, subject_sex, subject_netflix_familiarity, content_continuation, settings, urls, qualtrics)
                        values
                            (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                .run(req.body.secret_word, req.body.started, req.body.subject_age, req.body.subject_sex, req.body.subject_netflix_familiarity,
                    req.body.content_continuation, JSON.stringify(req.body.settings), JSON.stringify(req.body.urls), link.link);

	    const last_id = db.prepare('select id from experiment order by id desc limit 1').get();
		console.log(last_id)
            res.status(201).json({experiment_id: last_id.id});
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });

    app.patch("/experiment", async (req, res) => {
        try {
            db.prepare('update experiment set ended = ? where id = ?').run(req.body.ended, req.body.experiment_id.id)

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
