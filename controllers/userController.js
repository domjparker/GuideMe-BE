const db = require("../models")
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
    // get request to get user info by _id
    findBySessionId: function (req, res) {
        db.User.findOne({ _id: req.session.user.id })
            .populate('tags')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // post request to create a user upon signup
    signup: function async(req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
        }).then(dbModel => {
            res.json(dbModel)
            res.status(204).end();
        }).catch(err => res.status(500).json(err));
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
                        email: data.email
                    }
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
        req.session.destroy()
        console.log("User is logged out")
        // TODO: needs a redirect if inside user profile, etc.
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
            .populate('mailbox.converser', 'firstName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // updates mailbox for both sender and recipient
    updateMailbox: function (req, res) {
            db.User.findOneAndUpdate({ _id: req.session.user.id}, { $push: { mailbox: {converser: req.body.converser}} })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
            db.User.findOneAndUpdate({ _id: req.body.converser}, { $push: { mailbox: {converser: req.session.user.id}} })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));  
    },
    // delete request to delete user's profile
    remove: function (req, res) {
        db.User.findById({ _id: req.session.user.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        db.Adventure.deleteMany({ hostId: req.session.user.id })
            .then(()=> console.log("deleted"))
            .catch(err => res.status(422).json(err));
    },
};



