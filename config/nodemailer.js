const nodemailer = require('nodemailer');
const { auth } = require("./config.json")["development"]



let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',    //host for gmail
    port: 465,    //port gmail
    secure: true,
    auth
});


module.exports = transporter;
