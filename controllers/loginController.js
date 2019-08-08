const Crypto = require("crypto");
const db = require('../database');
const transporter = require('../helpers/sendemail');
const encrypt = 'takamoruchi';

module.exports = {
    user: (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var hashPassword = Crypto.createHmac("sha256", encrypt).update(password).digest("hex");
        var sql = `select * from user where username = '${username}' and password = '${hashPassword}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    keeplogin: (req, res) => {
        var username = req.query.username
        var sql = `select * from user where username = '${username}'`
        db.query(sql, (err, result) => {
            res.send(result)
        })
    },

    verified: (req, res) => {
        var { username, password } = req.body;
        var sql = `select * from user where username='${username}' and password='${password}'`;
        db.query(sql, (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                sql = `update user set status = 'Verified' where id = ${results[0].id}`;
                db.query(sql, (err1, results1) => {
                    if (err1) throw err1;

                    res.send({
                        username,
                        email: results[0].email,
                        role: results[0].role,
                        status: 'VERIFIED',
                    })
                })

            }
            else {
                throw 'User not exist!';
            }
        })
    },

    register: (req, res) => {        
        // var { username, password, email, phone } = req.body;
        var { username, password, email } = req.body;
        var sql = `select username from user where username='${username}'`;
        db.query(sql, (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                res.send({ status: 'error', message: 'Username has been taken!' })
            } else {
                var hashPassword = Crypto.createHmac("sha256", encrypt)
                    .update(password).digest("hex");

                var dataUser = {
                    username,
                    password: hashPassword,
                    email,
                    // phone,
                    role: 'MEMBER',
                    status: 'UNVERIFIED',
                }
                sql = `insert into user set ? `;
                db.query(sql, dataUser, (err1, results1) => {
                    if (err1) throw err1;

                    var linkVerifikasi = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`;
                    var mailOptions = {
                        from: '/ uang-kuno / <reuter3yandri3@gmail.com>',
                        to: email,
                        subject: 'User Account Verification',
                        html: `Please Click this link to verification your account : <a href="${linkVerifikasi}">Account Verification!</a>`
                    }

                    transporter.sendMail(mailOptions, (err2, res2) => {
                        if (err2) {
                            console.log(err2)
                            throw err2;
                        }
                        else {
                            console.log('Success!')
                            res.send({ username, email, role: 'MEMBER', status: 'UNVERIFIED', token: '' })
                        }
                    })
                })
            }
        })
    }
}