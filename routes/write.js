const express    = require("express");
const router     = express.Router();
const authToken  = require("../authToken.js");
const dgReading    = require("../models/dg");
const freezerReading    = require("../models/freezer");
const voltageReading    = require("../models/voltage");

router.get("/:uid", authToken, async (req, res) => {
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

// router.post("/write", async (req, res) => {
// 	try {
// 		let reading = new Reading(req.body);
// 		let newReading = reading.save();
// 		if(newReading == null) {
// 			throw new Error("Couldn't Save.");
// 		}
// 		res.status(200).json({msg: "OK"});
// 	} catch(err) {
// 		res.status(500).json({message: err.message});
// 	}
// });

router.post("/freezer", async (req, res) => {
	try {
		let fzr = new freezerReading(req.body);
		let savedFzr = fzr.save();
		if(savedFzr == null) {
			throw new Error("Could not save.");
		}
		res.status(201).json(
			{
				msg: "OK"
			}
		)
	} catch(err) {
		res.status(500).json({msg: err.message});
	}
});

router.post("/dg", async (req, res) => {
	try {
		let dgr = new dgReading(req.body);
		let savedDgr = dgr.save();
		if(savedDgr == null) {
			throw new Error("Could not save.");
		}
		res.status(201).json(
			{
				msg: "OK"
			}
		)
	} catch(err) {
		res.status(500).json({msg: err.message});
	}
});

router.post("/voltage", async (req, res) => {
	try {
		let vtgr = new voltageReading(req.body);
		let savedVtgr = vtgr.save();
		if(savedVtgr == null) {
			throw new Error("Could not save.");
		}
		res.status(201).json(
			{
				msg: "OK"
			}
		)
	} catch(err) {
		res.status(500).json({msg: err.message});
	}
});

module.exports = router;
