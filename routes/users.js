const router = require("express").Router();
const lib = require("../lib");
const validInfo = require("../middleware/validInfo");

router.post("/register", validInfo.register, async (req, res) => {
    console.log("Create user called.");
    try {
        const { name, username, email, password } = req.body;

        const isEmail = await lib.getUsersByEmail(email);
        const isUsername = await lib.getUsersByUsername(username);

        if (!isEmail) {
            await lib.createUser(req.body);
        } else {
            console.log("Email already exists.");
            res.status(400).send("Email already exists.");
        }

        if (!isUsername) {
            await lib.createUser(req.body);
        } else {
            console.log("Username already exists.");
            res.status(400).send("Username already exists.");
        }

        console.log("User created.");
    } catch (err) {
        console.log(err);
    }
});

// router.get("/getusers", async (req, res) => {
//     console.log("Get users called.");
//     await lib.getUsers();
// });

// router.post("/login", async (req, res) => {
//     console.log("login");
//     const { username, password } = req.body;
//     await lib.loginUser(req.body);
// });


module.exports = router;