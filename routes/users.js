const express = require("express")
const router  = express.Router()
const User    = require('../models/users')


router.post('/register', (req, res) => {
	let user;
	console.log(req.body.user);
	try {
		res.status(200).json({message: "well"});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

router.post('/login', async (res, req) => {
	  //
})

module.exports = router
