// const nodemailer = require('nodemailer');
// const creds = require('./config');

// const GuieMe_Email = 'guideme2020app@gmail.com'

// //TESTING SETUP ONLY, DELETE ONCE FINISHED
// const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "d5cb7197ce6717", // replace with your Mailtrap credentials
//       pass: "700097dd41ecff!"
//     },
//     debug: true, // show debug output
//     logger: true // log information in console
//   });
// ///------DELETE LINES BETWEEN TESTING COMMENT ABOVE, AND------/////////

// //SETTING UP TRANSPORTER FOR EMAIL DELIVERY
// // var transport = {
// //   host: 'gmail', // e.g. smtp.gmail.com
// //   auth: {
// //     user: creds.USER,
// //     pass: creds.PASS
// //   }
// // }

// // var transporter = nodemailer.createTransport(transport)

// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.log(error);
// //   } else {
// //     console.log('All works fine, congratz!');
// //   }
// // });


// app.use(express.json()); app.post('/send', (req, res, next) => {
//   const name = req.body.name
//   const email = req.body.email
//   const message = req.body.messageHtml


//   var mail = {
//     from: name,
//     to: 'andrew_j1206@hotmail.com',  
//     subject: 'Contact form request',

//     html: message
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: 'fail'
//       })
//     } else {
//       res.json({
//         msg: 'success'
//       })
//     }
//   })
// })