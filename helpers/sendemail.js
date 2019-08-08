// const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'budiyahmed@gmail.com',
//         pass: 'xseslcnejndoiadu'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

// module.exports = transporter;

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'reuter3yandri3@gmail.com',
        pass: 'erqbcrttilzfmyvf'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;

