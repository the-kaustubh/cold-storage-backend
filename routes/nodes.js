const express = require("express");
const router  = express.Router();
const Node    = require("../models/nodes");

// const Voltage = require("../models/getVoltage.js");
// const DG = require("../models/getDG.js");
// const Freezer = require("../models/getFreezer.js");

const getDG = require("../getDG.js");
const getFreezer = require("../getFreezer.js");
const getVoltage = require("../getVoltage.js");

const authenticateToken = require("../authToken");

router.get("/", authenticateToken, async (req, res) => {
	try {
		let nodes;
		if(req.user.designation === "user") {
			nodes = await Node.find({user: req.user.username});
		} else {
			nodes = await Node.find({location: req.user.institute});
		}
		res.json(nodes);
	} catch(err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/readings/:uid", authenticateToken, async (req, res) => {
	const UID = req.params.uid;
	try {
		const dg = await getDG(UID);
		const freezer = await getFreezer(UID);
		const voltage = await getVoltage(UID);

		const response = {
			dg: dg,
			freezer: freezer,
			voltage: voltage
		}
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});

router.post("/add", authenticateToken, async (req, res) => {
	req.body.user = req.user.username;
	const node = new Node(req.body);
	const reading = new Reading(req.body);
	try {
		
		if(req.user.designation == "maintenance") {
			throw new Error("Maintenance is not allowed to add nodes.");
		}
		const newNode = await node.save();
		const newReading = await reading.save();
		res.status(201).json({
			"node": newNode,
			"reading": newReading
		});
	} catch (err) {
		if(process.env.test) {
			console.log(err);
		}
		res.status(400).json({ message: err.message });
	}
});

// router.post("/modify", getNode, async(req, res) => {
// 	var conditions = { uid: res.node.uid };
// 	var update = { $set: req.body };

// 	try {
// 		let newNode = await Node.findOneAndUpdate(conditions, update);
// 		res.status(201).json({node: newNode});
// 	} catch (err) {
// 		res.status(404).json({message: err.message});
// 	}
// });

router.delete("/:uid", authenticateToken, async(req, res) => {
	 try {
		 let tbd;
		 if( req.user.designation == "admin" ) {
			 tbd = await Node.findOne({
				 uid: req.params.uid
			 });
		 } else {
			 tbd = await Node.findOne({
				 uid: req.params.uid,
				 user: req.user.username
			 });
		 }
		 Reading.deleteMany({ uid: tbd.uid}, (err) => {
			 if (err) {
				 return res.status(500).json({message: err.message});
			 }
		 });
		 Node.deleteOne({uid: tbd.uid}, function (err) {
			 if (err) {
				 return res.status(500).json({message: err.message});
			 }
		 });
		 res.status(200).json({
			   message: "Deleted Successfully"
		 });
	 } catch (err) {
		if(process.env.test) {
			console.log(err);
		}
		 res.status(503).json({message: err.message});
	 }
});

// async function getNode(req, res, next) {
// 	let node;
// 	try {
// 		node = await Node.find({"uid": req.body.uid});
// 		if(node == null) {
// 			return res.status(404).json({ message: "Cannot Find Node"});
// 		}
// 	} catch(err) {
// 		return res.status(404).json({ message: err.message});
// 	}
// 	res.node = node[0];
// 	next();
// }
module.exports = router;
