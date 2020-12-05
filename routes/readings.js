const express    = require("express");
const router     = express.Router();
const Reading    = require("../models/readings");
const authToken  = require("../authToken.js");

router.get("/:uid", authToken, async (req, res) => {
	// TODO: implement and return the latest readings
	let reading;
	try {
		reading = await Reading.find({
			uid: req.params.uid
		}).sort({
			datetime:-1
		});
		res.json(reading[0]);
	} catch(err) {
		res.status(500).json({message: err.message});
	}
});

router.post("/write", async (req, res) => {
	try {
		let reading = new Reading(req.body);
		let newReading = reading.save();
		if(newReading == null) {
			throw new Error("Couldn't Save.");
		}
		res.status(200).json({msg: "OK"});
	} catch(err) {
		res.status(500).json({message: err.message});
	}
});

module.exports = router;
