module.exports = function (app, db) {
    app.post("/link", async (req, res) => {
        //Get qualtrics link

        try {
            const row = db.prepare('select qualtrics from experiment where id = ?').get(req.body.experiment_id);
            res.setHeader("Content-Type", "application/json");
            res.status(200)
            res.end(JSON.stringify(row.qualtrics, null, 3));
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });
};

