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

//  lib.user.generateToken(user.id);
async function generateToken(id) {
    // jwt token
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    console.log(token);
}

async function registerUser(name, username, email, password) {
    const pass = await hashPass(password);
    try {
        const newUser = await prisma.users.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: pass
            }
        });
        console.log(newUser);
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

async function loginUser(username, password) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            },
            select: {
                name: true
            }
        });

        const pass = await comparePass(password, user.password);

        if (pass) {
            console.log("Login successful.");
        } else {
            console.log("Login failed.");
        }
    } catch (err) {
        console.log(err);
    }
}

async function getUsers() {
    try {
        const users = await prisma.users.findMany();
        console.log(users);
        return users;
    } catch (err) {
        console.log(err);
    }
}

async function getUserbyId(userId) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getUsersByEmail(email) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getUsersByUsername(username) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getIdbyUsername(username) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            },
            select: {
                id: true
            }
        });

        return user;
    } catch (err) {
        console.log(err);
    }
}
async function openAccount(userId, balance) {
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
                balance: balance,
                accountHolder: accountHolder.name
            }
        });
        console.log(account);
        return account;
    } catch (err) {
        console.log(err);
    }
}

async function deposit(accountId, amount) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });
        const newBalance = account.balance + amount;
        const updatedAccount = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                balance: newBalance
            }
        });
        console.log(updatedAccount);
        return updatedAccount;
    } catch (err) {
        console.log(err);
    }
}

async function withdraw(accountId, amount) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });
        const newBalance = account.balance - amount;
        if (newBalance < 0) {
            throw new Error("Insufficient funds.");
        }
        const updatedAccount = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                balance: newBalance
            }
        });
        console.log(updatedAccount);
        return updatedAccount;
    } catch (err) {
        console.log(err);
    }
}

async function transfer(fromAccountId, toAccountId, amount) {
    try {
        const fromAccount = await prisma.account.findUnique({
            where: {
                id: fromAccountId
            }
        });
        const toAccount = await prisma.account.findUnique({
            where: {
                id: toAccountId
            }
        });

        if (fromAccount.balance < amount) {
            throw new Error("Insufficient funds.");
        }

        const newFromBalance = fromAccount.balance - amount;
        const newToBalance = toAccount.balance + amount;

        if (newFromBalance < 0) {
            throw new Error("Insufficient funds.");
        }

        const updatedFromAccount = await prisma.account.update({
            where: {
                id: fromAccountId
            },
            data: {
                balance: newFromBalance
            }
        });

        const updatedToAccount = await prisma.account.update({
            where: {
                id: toAccountId
            },
            data: {
                balance: newToBalance
            }
        });

        console.log(updatedFromAccount);
        console.log(updatedToAccount);

        return {
            updatedFromAccount,
            updatedToAccount
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function closeAccount(accountId) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });
        const deletedAccount = await prisma.account.delete({
            where: {
                id: accountId
            }
        });
        console.log(deletedAccount);
        return deletedAccount;
    } catch (err) {
        console.log(err);
    }
}

async function getAccount(accountId) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });
        console.log(account);
        return account;
    } catch (err) {
        console.log(err);
    }
}

async function getAllAccounts() {
    try {
        const accounts = await prisma.account.findMany();
        console.log(accounts);
        return accounts;
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(userId) {
    try {
        const user = await prisma.users.delete({
            where: {
                id: userId
            }
        });
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function userNameToAccountId(name) {
    try {
        const account = await prisma.account.findUnique({
            where: {
                accountHolder: name
            },
            select: {
                id: true
            }
        });
        console.log(account);
        return account;
    } catch (err) {
        console.log(err);
    }
}

async function getTrasaction(userId, username) {
    // get the transaction detail for the user which includes the amount and the timestamp
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                OR: [
                    {
                        fromId: userId
                    },
                    {
                        toId: userId
                    }
                ],
                OR: [
                    {
                        fromName: username
                    },
                    {
                        toName: username
                    }
                ]
            },
            select: {
                amount: true,
                timestamp: true,
                fromId: true,
                toId: true
            }
        });
        console.log(transaction);
        return transaction;
    } catch (err) {
        console.log(err);
    }
}

async function createTable(name, amount) {
    try {
        const table = await prisma.transactions.create({
            data: {
                // id: id,
                name: name,
                amount: amount,
                timestamp: new Date().toISOString()
            }
        });
        console.log(table);
        return table;
    } catch (err) {
        console.log(err);
    }
}
async function getTable() {
    try {
        const table = await prisma.transactions.findMany();
        console.log(table);
        return table;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    comparePass,
    registerUser,
    loginUser,
    getUsers,
    openAccount,
    deposit,
    withdraw,
    transfer,
    closeAccount,
    getTrasaction,
    getAccount,
    deleteUser,
    userNameToAccountId,
    getUsersByEmail,
    getUsersByUsername,
    generateToken,
    // intIdtoStringId,
    getIdbyUsername,
    getAllAccounts,
    getUserbyId,
    createTable,
    getTable
};
