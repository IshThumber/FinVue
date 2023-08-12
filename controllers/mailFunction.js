// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendMail = async (req, res) => {
//   // let testAccount = await nodemailer.createTestAccount();

//   try {
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "craig50@ethereal.email",
//         pass: "Fdr9Hp4JKVdeXfjvw8"
//       }
//     });

//     let info = await transport.sendMail({
//       from: "craig50@ethereal.email",
//       to: "ffgghf@gmail.com",
//       subject: "Hello ✔",
//       text: "Hello world?"
//     });

//     console.log("Message sent: %s", info.messageId);

//     res.send(info.messageId);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = sendMail;

const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "craig50@ethereal.email",
                pass: "Fdr9Hp4JKVdeXfjvw8"
            }
        });

        let info = await transport.sendMail({
            from: "youremail@gmail.com",
            to: "myfriend@yahoo.com",
            subject: "Sending Email using Node.js",
            text: "That was easy!"
        });

        transport.sendMail(info, function(err, data) {
            if (err) {
                console.log(err);
            }
            console.log("Message sent: %s", info.messageId);
            res.send(info.messageId);
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendMail;
