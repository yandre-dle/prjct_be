const db = require('../database');
const Crypto = require('crypto');
const encrypt = 'takamoruchi'

module.exports = {
    // nitip transaction
    getTransaction: (req, res) => {
        var sql = `select * from daftarorder`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    deleteTransaction: (req, res) => {
        var idtrx = req.params.id
        var sql = `select * from daftarorder where id = ${idtrx}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `delete from daftarorder where id = ${idtrx}`
                db.query(sql, (err1, results) => {
                    if (err) throw err;
                    var sql = `delete from detailorder where idtrx = ${idtrx}`
                    db.query(sql, (err2, resulth) => {
                        if (err) throw err;
                        console.log(`transaksi dengan id ${idtrx} berhasil dihapus dari tabel detailorder`)
                    })
                    res.send(results);
                })
            }
        })
    },
    // nitip  query untuk list users
    getUsers: (req, res) => {
        var sql = `select * from user`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },
    deleteUser: (req, res) => {
        var deleteby = req.params.by;
        var sql = `select * from user where id = ${deleteby}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `delete from user where id = ${deleteby}`;
                db.query(sql, (err1, result1) => {
                    if (err1) throw err1;
                    res.send(result1)
                })
            }
        })
    },
    addUser: (req, res) => {
        var { username, password, email, role, status } = req.body;
        var sql = `select username from user where username = '${username}'`;
        db.query(sql, (err,results) => {
            if (err) throw err;
            if(results.length > 0) {
                res.send({ status: 'error', message: 'Username has been taken.' }); 
            }
            else { 
                var hashPassword = Crypto.createHmac("sha256", encrypt).update(password).digest("hex");
                var dataUser = { 
                    username,
                    password: hashPassword,
                    email,
                    // phone,
                    role,
                    status
                }
                sql = `insert into user set ?`;
                db.query(sql, dataUser, (err,result) => {
                    if (err) throw err;
                    res.send(result);
                });
            }
        });
    },
    editUser: (req,res) => {
        var sql = `select * from user where id = ${req.params.id};`;
        db.query(sql, (err, results) => {
            if(err) throw err;
    
            if(results.length > 0) {
                try {
                    var { username, password, email, role, status } = req.body;
                    var hashPassword = Crypto.createHmac("sha256", encrypt).update(password).digest("hex");
                    var dataUser = { 
                        username,
                        password: hashPassword,
                        email,
                        // phone,
                        role,
                        status
                    }
                    sql = `update user set ? where id = ${req.params.id};`
                    db.query(sql, dataUser, (err1, results1) => {
                        if (err1) throw err1;
                        sql = `SELECT * FROM user;`;
                        db.query(sql, (err2,results2) => {
                            if(err2) throw err2
                            res.send(results2);
                        })
                    })
                }
                catch(err){
                    return res.status(500).json({ 
                        message: "There's an error on the server. Please contact the administrator.", 
                        error: err.message 
                    });
                }
            }
        })
    },
}