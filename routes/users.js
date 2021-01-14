const express = require("express");
const { validate, User } = require("../modules/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("Exist such user");
    
    user = new User(req.body, ["name", "password", "email"]);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    res.status(201).send(_.pick(user, ["name", "password"]));
});

module.exports = router;