const db = require("../models")
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

module.exports = {
    // get user info by ID
    findById: function (req, res) {
        db.User.findOne(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    // create a user upon signup
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

    login: function (req, res) {
        db.User.findOne({
            email: req.body.email
        }).then(data => {
            if (!data) {
                return res.status(404).send('no such user')
            } else {
                if (bcrypt, bcrypt.compareSync(req.body.password, data.password)) {
                    // req.session.user = {
                    //     _id: data._id,
                    //     email: data.email
                    // }
                    // console.log(req.session.user)
                    res.send("login successful");
                } else {
                    res.status(401).send("wrong password")
                }
            }
        }).catch(err => {
            return res.status(500).end();
        });
    },

    update: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, {
            bio: req.body.bio,
            location: req.body.location,
            tags: req.body.tags,
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    remove: function (req, res) {
        db.User.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};