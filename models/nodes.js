const mongoose = require('mongoose');

const voltageSchema = new mongoose.Schema( {
  r: Number,
  y: Number,
  b: Number
})

const supplySchema = new mongoose.Schema({
  mains: voltageSchema,
  stabilizer: voltageSchema,
  amf: voltageSchema
})

const nodeSchema = new mongoose.Schema( {
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  supply: {
    type: supplySchema,
    required: true
  },
  dg: {
    upTime: {
      type: Number,
      required: true
    },
    fuelConsumption: {
      type: Number,
      required: true
    },
    power: {
      type: Number,
      required: true
    }
  },
  freezer: {
    temperature: {
      type: Number,
      required: true
    },
    power: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model('node', nodeSchema);
