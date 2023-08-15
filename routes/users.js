const router = require("express").Router();
const lib = require("../lib");
const auth = require("../middleware/auth");

router.get("/getusers", async (req, res) => {
    console.log("getusers");
    try {
        const users = await lib.getUsers();
        console.log(users);

        return res.type("json").send(users);
    } catch (err) {
        console.log(err);
    }
});

router.post("/users/:id", async (req, res) => {
    console.log(`User ${req.params.id}`);

    try {
        const id = parseInt(req.params.id);

        const user = await lib.getUserbyId(id);

        console.log(user);
        return res.type("json").send(user);
    } catch (err) {
        console.log(err);
    }
});

router.post("/useru", async (req, res) => {
    console.log("user by username");

    try {
        const username = req.body.username;
        const byUsername = await lib.getUsersByUsername(username);

        if (!byUsername) {
            return res.type("json").send({ error: "Username not found" });
        }

        console.log(byUsername);
        return res.type("json").send(byUsername);
    } catch (err) {
        console.log(err);
    }
});

router.post("/usere", async (req, res) => {
    console.log("user by email");

    try {
        const email = req.body.email;
        const byEmail = await lib.getUsersByEmail(email);

        if (!byEmail) {
            return res.type("json").send({ error: "Email not found" });
        }
        console.log(byEmail);
        return res.type("json").send(byEmail);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
