const express = require("express");
const { validate, User } = require("../modules/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("Exist such user");
    
    user = new User(req.body, ["name", "password", "email", "isAdmin"]);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    res.status(201).send(_.pick(user, ["email", "password", "isAdmin"]));
});

module.exports = router;