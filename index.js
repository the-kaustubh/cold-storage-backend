require('dotenv').config()

const express  = require("express");
const app      = express();
const mongoose = require("mongoose");
const cors     = require("cors");

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
		useFindAndModify: false
  });

const db = mongoose.connection;
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected'))

app.use(express.json())
app.use(cors());

const nodeRouter = require('./routes/nodes')
app.use('/node', nodeRouter)

const userRouter = require('./routes/users')
app.use('/user', userRouter)

const clientRouter = require('./routes/clients')
app.use('/client', clientRouter)

app.listen(process.env.PORT, () => console.log("Server Started"))

