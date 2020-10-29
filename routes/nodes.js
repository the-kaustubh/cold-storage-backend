const express = require("express")
const router  = express.Router()
const Node    = require('../models/nodes')

router.get("/", async (req, res) => {
  try {
   const nodes = await Node.find()
   res.json(nodes);
  } catch {
    res.status(500).json({ message: err.message })
  }
})

router.post("/add", async (req, res) => {
  const node = new Node(req.body);
  try {
    const newNode = await node.save()
    res.status(201).json(newNode);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post("/modify", getNode, async(req, res) => {
	var conditions = { uid: res.node.uid };
	var update = { $set: req.body };

	console.log(conditions);
	console.log(update);
	let doc = await Node.findOneAndUpdate(conditions, update);
	res.status(201).json({msg: "done"});

})

router.delete("/:id", async(req, res) => {
	 try {
		 Node.deleteOne({_id: req.params.id}, function (err) {
			 if (err)
				 return res.status(500).json({message: err.message});
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
	console.log(res.node);
	next()
}
module.exports = router
