const mongoose = require("mongoose");

const voltageSchema = new mongoose.Schema( {
	r: {
		type: Number,
		required: true
	},
	y: {
		type: Number,
		required: true
	},
	b: {
		type: Number,
		required: true
	}
});

const supplySchema = new mongoose.Schema({
	mains: {
		type: voltageSchema,
		required: true
	},
	stabilizer: {
		type: voltageSchema,
		required: true
	},
	amf: {
		type: voltageSchema,
		required: true
	}
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
