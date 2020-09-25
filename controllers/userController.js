const db = require("../models")
const bcrypt = require("bcrypt");
const { User } = require("../models");
const nodemailer = require('nodemailer')
const creds = require('../config');

module.exports = {
    // get request to get user info by _id
    findBySessionId: function (req, res) {
        db.User.findOne({ _id: req.session.user.id })
            .populate('tags')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    findUserById: function (req, res) {
        db.User.findOne({ _id: req.params.id })
            .populate('tags')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // post request to create a user upon signup + add new user to community db
    signup: function async(req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
            profilePictureUrl: "https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?cs=srgb&dl=pexels-jake-colvin-1761282.jpg&fm=jpg",
            profileBannerUrl: "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?cs=srgb&dl=pexels-veeterzy-38136.jpg&fm=jpg"


            //-------NODEMAILER-------//
        }).then(function (newUser) {
            if (req.body.email) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: creds.USER,
                        pass: creds.PASS

                    }
                });
                var mailOptions = {
                    from: 'guideme2020app@gmail.com',
                    to: `${req.body.email}`,
                    subject: `Welcome to GuideMe, ${newUser.firstName}`,
                    text: `Thank you for signing up. Start exploring today at https://guidemedimma.herokuapp.com/`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Email sent`)
                    }
                });
            }
            db.Community.create({
                targetId: newUser._id,
                action: "newUser",
                adventureId: null,
                postImageUrl: null
            }).then(() => {
                res.status(204).end();
            }).catch(err => res.status(500).json(err));
            //New user added to community 
        }).catch(err => res.status(500).json(err));
    },

    nodemailerMailBox: function (req, res) {
        if (req.body.email) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: creds.USER,
                    pass: creds.PASS

                }
            });
            var mailOptions = {
                from: 'guideme2020app@gmail.com',
                to: `${req.body.email}`,
                subject: `New message from: ${req.session.user.firstName}`,
                text: `${req.session.user.firstName} sent you ${req.body.messageText}, log in at https://guidemedimma.herokuapp.com/ to respond. `
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent`)
                }
            });
        }

    },

    //post request to log user into account, or deny if login unsuccessful
    login: function (req, res) {
        db.User.findOne({
            email: req.body.email
        }).then(data => {
            if (!data) {
                return res.status(404).send('no such user')
            } else {
                if (bcrypt, bcrypt.compareSync(req.body.password, data.password)) {
                    req.session.user = {
                        id: data._id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    }
                    console.log(req.session)
                    console.log(req.session.user)
                    res.send("session login successful");
                } else {
                    res.status(401).send("wrong password")
                }
            }
        }).catch(err => {
            return res.status(500).end();
        });
    },
    getSession: function (req, res) {
        res.json(req.session.user)
    },
    logout: function (req, res) {
        console.log(req.session)
        console.log("THIS IS SESSION")
        req.session.destroy()
        res.send("User is logged out")

    },

    // put request to update user bio and location
    update: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // put request to update user profile picture
    updatePicture: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, {
            profilePictureUrl: req.body.profilePictureUrl
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // put request to update user profile banner pic
    updateBanner: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, {
            profileBannerUrl: req.body.profileBannerUrl
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getMailbox: function (req, res) {
        db.User.findOne({ _id: req.session.user.id })
            .populate('mailbox.converser')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // updates mailbox for both sender and recipient
    updateMailbox: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, { $push: { mailbox: { converser: req.body.converser } } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        db.User.findOneAndUpdate({ _id: req.body.converser }, { $push: { mailbox: { converser: req.session.user.id } } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //Gets availability array
    getHostAvailability: function (req, res) {
        db.User.findOne({ _id: req.params.id })
            .populate('availability')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    getAvailability: function (req, res) {
        db.User.findOne({ _id: req.session.user.id })
            .populate('availability')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // Update availability array
    updateAvailability: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, {
            availability: req.body.availability
        })
            .populate('availability')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    updateAvailabilityBooking: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.body.id }, {
            availability: req.body.availability
        })
            .populate('availability')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // delete request to delete user's profile
    remove: function (req, res) {
        db.User.findById({ _id: req.session.user.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        db.Adventure.deleteMany({ hostId: req.session.user.id })
            .then(() => console.log("deleted"))
            .catch(err => res.status(422).json(err));
        db.Community.deleteMany({ targetId: req.session.user.id })
            .then(() => res.status(204).end())
            .catch(err => res.status(500).json(err));
        db.Review.deleteMany({ hostId: req.session.user.id })
            .then(() => res.status(204).end())
            .catch(err => res.status(500).json(err));   
    }

};



