//SELECT id + 1 FROM experiment ORDER BY id DESC LIMIT 1

module.exports = function (app, db) {
    app.get("/id", async (req, res) => {
        //Get next id

        try {
            const row = db.prepare('select id + 1 as id from experiment order by id desc limit 1').all();

            res.setHeader("Content-Type", "application/json");
            res.status(200)
            res.end(JSON.stringify(row[0].id, null, 3));
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Failed" });
        }
    });
};
