const router = require("express").Router();
const general = require("../general");
const moment = require("moment");
router.post("/create_table", async (req, res) => {
    console.log("create_table");
    try {
        const { name, amount, userId } = req.body;

        const Tdate = moment().format();
        if (!name || !amount) {
            return res.status(400).json({ error: "Invalid request" });
        }
        // const nameid = general.generateUniqueIdByName(name, 5);
        // const timeid = moment().format("DDHHmmss");
        // convert timeid to int

        // const tid = parseInt(timeid);
        // // parseInt(trans_id);
        // console.log(typeof trans_id);
        const table = await general.createTable(
            // tid,
            name,
            amount,
            Tdate,
            userId
        );

        console.log(table);

        res.send(table).status(200).json({ message: "Table entry successful" });
    } catch (err) {
        console.error(err);
    }
});

router.get("/get_table", async (req, res) => {
    console.log("get_table");

    try {
        const table = await general.getTable();
        res.status(200).json(table);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
