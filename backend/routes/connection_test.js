module.exports = function (app) {
    app.get("/connection_test", (req, res) => {
        console.log(req.body)
        res.status(200).json({msg: "OK"});
    });
};
