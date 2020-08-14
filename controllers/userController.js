const db = require("../models")
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
    // get request to get user info by _id
    findBySessionId: function (req, res) {
        db.User.findOne({_id: req.session.user.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // post request to create a user upon signup
    signup: function async (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10),null)
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

    logout: function (req, res) {
        req.session.destroy();
        console.log("User is logged out")
        // TODO: needs a redirect if inside user profile, etc.
    },

    // put request to update user bio and location
    update: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.session.user.id }, {
            bio: req.body.bio,
            location: req.body.location
            // tags: req.body.tags,
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // delete request to delete user's profile
    remove: function (req, res) {
        db.User.findById({ _id: req.session.user.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};