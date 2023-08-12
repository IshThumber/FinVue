const prisma = require("./prismaClient");
const lib = require("../lib");

const users = [
    {
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@gmail.com",
        password: "password"
    },
    {
        name: "Jane Doe",
        username: "janedoe",
        email: "janedoe@gmail.com",
        password: "password"
    },
    {
        name: "John Smith",
        username: "johnsmith",
        email: "john.smith@gmail.com",
        password: "password"
    }
];

const accounts = [
    {
        userId: 1,
        balance: 1000
    },
    {
        userId: 2,
        balance: 1200
    },
    {
        userId: 3,
        balance: 1500
    }
];

async function createUsers() {
    try {
        prisma.$connect();

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await lib.createUser(
                user.name,
                user.username,
                user.email,
                user.password
            );
        }
        console.log("Users created.");
        prisma.$disconnect();
        if (prisma.$disconnect()) {
            console.log("Disconnected from database.");
        }
    } catch (err) {
        console.log(err);
    }
}

async function seedAccounts() {
    try {
        prisma.$connect();

        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            await lib.openAccount(account.userId, account.balance);
        }
        console.log("Accounts created.");
        prisma.$disconnect();
        if (prisma.$disconnect()) {
            console.log("Disconnected from database.");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createUsers,
    seedAccounts
};
