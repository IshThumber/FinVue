const uuidv4 = require("crypto").randomUUID;
const prisma = require("./prisma/prismaClient");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const hashPass = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error(err);
    }
};

const comparePass = async (password, hashPass) => {
    try {
        return await bcrypt.compare(password, hashPass);
    } catch (err) {
        console.error(err);
    }
};

const generateUniqueIdByName = async (name, length = 10) => {
    // const uuid = uuidv4();
    const nameHash = `${name}`;
    const hash = require("crypto")
        .createHash("sha256")
        .update(nameHash)
        .digest("hex");

    const truncatedHash = hash.substring(0, length);
    return truncatedHash;
};

module.exports = {
    hashPass,
    comparePass,
    generateUniqueIdByName,
    //
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    getUserByName,
    getUsers,
    //
    createAccount,
    getAccountsByUserId,
    getAccountByAccountId,
    getAccountByAccountHolder,
    updateAccount,
    //
    createTable,
    getTable,
    updateTable
};

async function createUser(name, username, email, password) {
    try {
        const hash = await hashPass(password);
        const user = await prisma.users.create({
            data: {
                name,
                username,
                email,
                password: hash
            }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function getUserByUsername(username) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                username
            }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function getUserById(id) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function getUserByName(name) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                name
            }
        });
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function getUsers() {
    try {
        const users = await prisma.users.findMany();
        return users;
    } catch (err) {
        console.error(err);
    }
}

async function createAccount(userId) {
    try {
        const accountHolder = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true
            }
        });
        const account = await prisma.account.create({
            data: {
                userId: userId,
                balance: 0,
                accountHolder: accountHolder.name
            }
        });
        return account;
    } catch (err) {
        console.error(err);
    }
}

async function getAccountsByUserId(userId) {
    try {
        const accounts = await prisma.account.findMany({
            where: {
                userId
            }
        });
        return accounts;
    } catch (err) {
        console.error(err);
    }
}

async function getAccountByAccountId(accountId) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });
        return account;
    } catch (err) {
        console.error(err);
    }
}

async function getAccountByAccountHolder(accountHolder) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                accountHolder
            }
        });
        return account;
    } catch (err) {
        console.error(err);
    }
}

async function updateAccount(accountId, balance) {
    try {
        const account = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                balance
            }
        });
        return account;
    } catch (err) {
        console.error(err);
    }
}

async function createTable(name, amount, transactionDate, userId) {
    try {
        // this will create entry in transaction table
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        });

        const table = await prisma.transactions.create({
            data: {
                // tid,
                name,
                amount,
                transactionDate,
                // userId: user.id,
                // username: user.username,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
        return table;
    } catch (err) {
        console.error(err);
    }
}

async function getTable() {
    try {
        const table = await prisma.transactions.findMany();
        return table;
    } catch (err) {
        console.error(err);
    }
}

async function updateTable(trans_id, name, amount, transactionDate) {
    try {
        const table = await prisma.transactions.update({
            where: {
                trans_id
            },
            data: {
                name,
                amount,
                transactionDate
            }
        });
        return table;
    } catch (err) {
        console.error(err);
    }
}
