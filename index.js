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

{
    // app.post("/stringid", async (req, res) => {
    //     console.log("String id called.");
    //     const { username } = req.body;
    //     try {
    //         const user = await prisma.users.findUnique({
    //             where: {
    //                 username: username
    //             },
    //             select: {
    //                 id: true
    //             }
    //         });
    //         res.type("json").send(JSON.stringify(user, null, 2) + "\n");
    //         console.log(user);
    //         return user;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // });
    // app.post("/isemail", async (req, res) => {
    //     console.log("Is email called.");
    //     const { email } = req.body;
    //     try {
    //         const user = await prisma.users.findUnique({
    //             where: {
    //                 email: email
    //             }
    //         });
    //         res.type("json").send(JSON.stringify(user, null, 2) + "\n");
    //         console.log(user);
    //         return user;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // });
    // app.get("/api/getusers", async (req, res) => {
    //     console.log("Get users called.");
    //     try {
    //         const users = await prisma.users.findMany();
    //         res.type("json").send(JSON.stringify(users, null, 2) + "\n");
    //         console.log(users);
    //         return users;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
    // app.post("/api/openaccount", async (req, res) => {
    //     console.log("Open account called.");
    //     const { userId, balance } = req.body;
    //     try {
    //         const accountHolder = await prisma.users.findUnique({
    //             where: {
    //                 id: userId
    //             },
    //             select: {
    //                 name: true
    //             }
    //         });
    //         const account = await prisma.account.create({
    //             data: {
    //                 userId: userId,
    //                 balance: balance,
    //                 accountHolder: accountHolder.name
    //             }
    //         });
    //         console.log(account);
    //         res.type("json").send(JSON.stringify(account, null, 2) + "\n");
    //         return account;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
    // app.get("/api/getaccounts", async (req, res) => {
    //     console.log("Get all accounts called.");
    //     try {
    //         const accounts = await prisma.account.findMany();
    //         res.type("json").send(JSON.stringify(accounts, null, 2) + "\n");
    //         console.log(accounts);
    //         return accounts;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
    // app.post("/transferfund", async (req, res) => {
    //     console.log("Transfer fund called.");
    //     const { fromId, toId, amount } = req.body;
    //     try {
    //         const fromAccount = await prisma.account.findUnique({
    //             where: {
    //                 id: fromId
    //             }
    //         });
    //         const toAccount = await prisma.account.findUnique({
    //             where: {
    //                 id: toId
    //             }
    //         });
    //         if (fromAccount.balance < amount) {
    //             res.status(400).send({
    //                 message: "Insufficient balance."
    //             });
    //         } else {
    //             if (amount > 0) {
    //                 const newFromBalance = fromAccount.balance - amount;
    //                 const newToBalance = toAccount.balance + amount;
    //                 const updatedFromAccount = await prisma.account.update({
    //                     where: {
    //                         id: fromId
    //                     },
    //                     data: {
    //                         balance: newFromBalance
    //                     }
    //                 });
    //                 const updatedToAccount = await prisma.account.update({
    //                     where: {
    //                         id: toId
    //                     },
    //                     data: {
    //                         balance: newToBalance
    //                     }
    //                 });
    //                 res.status(200).send({
    //                     message: "Fund transferred successfully.",
    //                     data: updatedToAccount
    //                 });
    //                 console.log(updatedFromAccount);
    //                 console.log(updatedToAccount);
    //                 return {
    //                     updatedFromAccount,
    //                     updatedToAccount
    //                 };
    //             } else {
    //                 res.status(400).send({
    //                     message: "Invalid amount."
    //                 });
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
}

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
