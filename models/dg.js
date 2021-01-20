const mongoose = require("mongoose");

const dgReadingSchema = new mongoose.Schema( {
	uid: {
		type: String,
		required: true,
	},
	power: {
		type: Number,
		required: true,
		default: 0
	},
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
	datetime: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model("dg_readings", dgReadingSchema);
