const express = require("express");
const router  = express.Router();
const User    = require("../models/users");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			email: req.body.email,
			institute: req.body.institute,
			designation: req.body.designation,
		});
		const newUser = await user.save();
		res.status(200).json(newUser);
	} catch (err) {
		res.status(400).json({message: err.message});
	}
});

router.post("/login", async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
	}).exec();
	if(user == null) {
		return res.status(400).json({message: "Cannot Find"});
	}
	try {
		if(await bcrypt.compare(req.body.password, user.password)) {
			const data = {
				username: user.username,
				institute: user.institute,
				designation: user.designation
			};
			console.log("--");
			console.log(data);
			console.log("--");
			const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
			res.json({accessToken: accessToken});
		} else {
			res.json({message: "Not Allowed"});
		}
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});

module.exports = router;
