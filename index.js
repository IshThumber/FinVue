const express = require("express");
require("dotenv").config();
const cors = require("cors");
const prisma = require("./prisma/prismaClient");
// const seed = require("./prisma/seed");
const lib = require("./lib");
const auth = require("./middleware/auth");
// const mailSender = require("./controllers/mailFunction");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// app.get("/", async (req, res) => {});

app.use("/api", require("./routes/authentication")); //register
app.use("/api", require("./routes/accounts")); //open account
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/verify"));
app.use("/api", require("./routes/funds"));

app.use("/api/v1", require("./routes/table.js"));

app.post("/api/get-transactions", async (req, res) => {
    const { userId, username } = req.body;
    const transactions = await lib.getTrasaction(userId, username);
    res.json(transactions);

    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

async function main() {
    console.log("Main function called.");
    try {
        // if ((await prisma.users.count()) == 0) {
        //   console.log("No users found. Creating users.");
        //   await seed.createUsers();
        // }
        // if ((await prisma.account.count()) == 0) {
        //   console.log("No accounts found. Creating accounts.");
        //   await seed.seedAccounts();
        // }
    } catch (err) {
        console.log(err);
    }
}

main();
