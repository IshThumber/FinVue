const router = require("express").Router();
const lib = require("../lib");
const validInfo = require("../middleware/validInfo");
const generateJWT = require("../controllers/jwtController");

router.post("/register", validInfo.register, async (req, res) => {
    console.log("Create user called.");
    try {
        const { name, username, email, password } = req.body;

        const isEmail = await lib.getUsersByEmail(email);
        const isUsername = await lib.getUsersByUsername(username);

        if (isEmail) {
            console.log("Email already exists.");
            return res.status(400).send("Email already exists.");
        }

        if (isUsername) {
            console.log("Username already exists.");
            return res.status(400).send("Username already exists.");
        }

        await lib.registerUser(name, username, email, password);
        console.log("User created.");

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", validInfo.login, async (req, res) => {
    console.log("Login");
    try {
        const { username, password } = req.body;
        const user = await lib.getUsersByUsername(username);

        if (!user) {
            console.log("Login failed.");
            return res.status(401).json({ message: "Login failed." });
        }

        const pass = await lib.comparePass(password, user.password);

        if (!pass) {
            console.log("Login failed.");
            return res.status(401).json({ message: "Login failed." });
        }

        const token = generateJWT(username);
        console.log("Login successful.");
        const response = { token: token, message: "Login successful." };

        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
