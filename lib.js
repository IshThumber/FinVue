const prisma = require("./prisma/prismaClient");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPass = async password => {
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

const intIdtoStringId = id => {
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 10;
    let uniqueString = "";

    while (id > 0 || uniqueString.length < length) {
        const remainder = id % characters.length;
        uniqueString = characters[remainder] + uniqueString;
        id = Math.floor(id / characters.length);
    }

    // If the generated string is shorter than the desired length, pad it with random characters
    while (uniqueString.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueString += characters[randomIndex];
    }

    return uniqueString;
};

async function toGetStringId(username) {
    try {
        const id = await prisma.users.findUnique({
            where: {
                username: username
            },
            select: {
                id: true
            }
        });

        const stringId = intIdtoStringId(id.id);
        console.log(stringId);
        return stringId;
    } catch (err) {
        console.error(err);
    }
}

// function generateUniqueString(id) {
//     const characters =
//         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     const length = 10;
//     let uniqueString = "";

//     while (id > 0 || uniqueString.length < length) {
//         const remainder = id % characters.length;
//         uniqueString = characters[remainder] + uniqueString;
//         id = Math.floor(id / characters.length);
//     }

//     // If the generated string is shorter than the desired length, pad it with random characters
//     while (uniqueString.length < length) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         uniqueString += characters[randomIndex];
//     }

//     return uniqueString;
// }

// // Example usage
// const databaseId = 123456;
// const uniqueId = generateUniqueString(databaseId);
// console.log(uniqueId);

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
        const newFromBalance = fromAccount.balance - amount;
        if (newFromBalance < 0) {
            throw new Error("Insufficient funds.");
        }
        const newToBalance = toAccount.balance + amount;
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
        console.log(err);
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
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        const deletedUser = await prisma.users.delete({
            where: {
                id: userId
            }
        });
        console.log(deletedUser);
        return deletedUser;
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
    getAccount,
    deleteUser,
    userNameToAccountId,
    getUsersByEmail,
    toGetStringId,
    getUsersByUsername,
    intIdtoStringId,
    getIdbyUsername,
    getAllAccounts,
    getUserbyId
};
