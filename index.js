require('dotenv').config()
const PORT = 3000

const express = require("express");
const app     = express();
const mongoose= require("mongoose");

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true
  });

const db = mongoose.connection;
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected'))

app.use(express.json())

const router = require('./routes/nodes')
app.use('/node', router)

app.listen(PORT, () => console.log("Server Started"))

