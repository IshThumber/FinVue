const router = require("express").Router();
const lib = require("../lib");

router.get("/", async (req, res) => {
    res.send("Hello world!");
});

router.post("/createuser", async (req, res) => {
    console.log("Create user called.");
    const { name, username, email, password } = req.body;
    await lib.createUser(req.body);
});

router.get("/getusers", async (req, res) => {
    console.log("Get users called.");
    await lib.getUsers();
});

router.post("/openaccount", async (req, res) => {
    console.log("Open account called.");
    const { userId, balance } = req.body;
    await lib.openAccount(req.body);
});

router.get("/getaccount", async (req, res) => {
    console.log("Get accounts called.");
    const accountId = req.query.accountId;
    await lib.getAccount(accountId);
});

router.post("/closeaccount", async (req, res) => {
    console.log("Close account called.");
    await lib.closeAccount(req.body);
});
