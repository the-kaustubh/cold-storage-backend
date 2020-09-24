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
  } catch {
    res.status(400).json({ message: err.message })
  }
})

async function getNode(req, res, next) {
  let node;
  try {
   node = await Node.find({"uid": req.params.uid})
   if(node == null) {
     return res.status(404).json({ message: 'Cannot Find Node'})
   }
  } catch {
   return res.status(404).json({ message: err.message})
  }
  res.node = node;
  next()
}
module.exports = router
