// http://localhost:3403/api/auth/is-verify

const router = require("express").Router();
const lib = require("../lib");
const auth = require("../middleware/auth");

router.get("/auth/is-verify", auth, (req, res) => {
    res.json(true);
});

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        const user = await lib.getUsersByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." });
        }

        const isMatch = await lib.comparePass(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }

        const token = lib.generateToken(user.id);
        res.json({
            token,
            user: {
                id: user.id,
                displayName: user.display_name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
