const express = require("express");
const router  = express.Router();
// const Node    = require("../models/readings");

router.get("/:uid", async (req, res) => {
	console.log(req.params.uid);
	res.send("alsdfj");
});

// router.post("/write", async (req, res) => {
// });

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
