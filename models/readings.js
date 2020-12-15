const mongoose = require("mongoose");

const voltageSchema = new mongoose.Schema( {
	r: Number,
	y: Number,
	b: Number
});

const supplySchema = new mongoose.Schema({
	mains: voltageSchema,
	stabilizer: voltageSchema,
	amf: voltageSchema
});

const readingSchema = new mongoose.Schema( {
	uid: {
		type: String,
		required: true,
		default: 0
	},
	datetime: {
		type: Date,
		required: true,
		default: Date.now
	},
	supply: {
		type: supplySchema,
		required: true,
	},
	dg: {
		upTime: {
			type: Number,
			required: true,
			default: 0
		},
		fuelConsumption: {
			type: Number,
			required: true,
			default: 0
		},
		power: {
			type: Number,
			required: true,
			default: 0,
		}
	},
	freezer: {
		temperature: {
			type: Number,
			required: true,
			default: 0
		},
		power: {
			type: Number,
			required: true,
			default: 0
		}
	}
});

module.exports = mongoose.model("readings", readingSchema);
