const express = require("express")
const router  = express.Router()
const Node    = require('../models/nodes')
const Reading = require('../models/readings')

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

router.get("/", async (req, res) => {
  try {
		let nodes = await Node.find()
		res.json(nodes);
  } catch {
    res.status(500).json({ message: err.message })
  }
})

router.get("/readings", async (req, res) => {
	try {
		const readings = await Reading.find();
		res.json(readings);
	} catch (er) {
		res.status(500).json({message: er.message})
	}
})

router.get('/readings/:uid', async (req, res) => {
	try {
		const reading = await Reading.findOne({uid: req.params.uid});
		res.json(reading);
	} catch (err) {
		res.status(500).json({message: err.message})
	}
})

router.post("/add", async (req, res) => {
  const node = new Node(req.body);
	const reading = new Reading(req.body);
  try {
		
    const newNode = await node.save()
		const newReading = await reading.save()
		res.status(201).json({
			"node": newNode,
			"reading": newReading
		});
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post("/modify", getNode, async(req, res) => {
	var conditions = { uid: res.node.uid };
	var update = { $set: req.body };

	try {
		let newNode = await Node.findOneAndUpdate(conditions, update);
		res.status(201).json({node: newNode});
	} catch (err) {
		res.status(404).json({message: err.message})
	}
})

router.delete("/:uid", async(req, res) => {
	 try {
		 const tbd = await Node.findOne({uid: req.params.uid})
		 console.log(tbd.uid)
		 Reading.deleteMany({ uid: tbd.uid}, (err) => {
			 if (err) {
				 return res.status(500).json({message: err.message});
			 }
		 })
		 Node.deleteOne({uid: tbd.uid}, function (err) {
			 if (err) {
				 return res.status(500).json({message: err.message});
			 }
		 });
		 res.status(200).json({
			   message: "Deleted Successfully"
		 });
	 } catch (err) {
		 res.status(503).json({message: err.message});
	 }
})

async function getNode(req, res, next) {
	let node;
	try {
		node = await Node.find({"uid": req.body.uid})
		if(node == null) {
			return res.status(404).json({ message: 'Cannot Find Node'})
		}
	} catch {
		return res.status(404).json({ message: err.message})
	}
	res.node = node[0];
	next()
}
module.exports = router
