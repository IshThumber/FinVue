const router = require("express").Router();
const lib = require("../lib");
const auth = require("../middleware/auth");

router.post("/openaccount", auth, async (req, res) => {
    console.log("Open account called.");
    try {
        const { userId, balance } = req.body;

        const account = await lib.getAccount(userId);

        if (account) {
            return res.status(400).json({ msg: "Account already exists." });
        }

        const newAccount = await lib.openAccount(userId, balance);

        return res.json(newAccount);
    } catch (err) {
        console.log(err);
    }
});

router.get("/getaccounts", async (req, res) => {
    console.log("Get all accounts called...");
    try {
        const accounts = await lib.getAllAccounts();

        return res.type("json").send(JSON.stringify(accounts, null, 2) + "\n");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
