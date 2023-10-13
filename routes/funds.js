const router = require("express").Router();
const lib = require("../lib");
const auth = require("../middleware/auth");

router.post("/transferfunds", auth, async (req, res) => {
    console.log("transferfunds");
    try {
        const { fromId, toId, amount } = req.body;

        if (!fromId || !toId || !amount) {
            return res.status(400).json({ error: "Invalid request" });
        }

        if (fromId === toId) {
            return res.status(400).json({ error: "Invalid request" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid request" });
        }

        const funds = await lib.transfer(fromId, toId, amount);

        console.log(funds);
        res.status(200).json({ message: "Transfer successful" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/table", async (req, res) => {
    console.log("table");
    try {
        const { name, amount } = req.body;

        if (!name || !amount) {
            return res.status(400).json({ error: "Invalid request" });
        }

        const tableEntry = await lib.createTable(name, amount);

        console.log(tableEntry);
        res.status(200).json({ message: "Table entry successful" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/gettable", async (req, res) => {
    console.log("get table");

    try {
        const table = await lib.getTable();
        res.status(200).json(table);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
