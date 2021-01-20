const mongoose = require("mongoose");

const voltageReadingSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	r: {
		type: Number,
		required: true,
		default: 0
	},
	y: {
		type: Number,
		required: true,
		default: 0
	},
	b: {
		type: Number,
		required: true,
		default: 0
	},
	place: {
		type: String,
		enum: ['mains', 'stabilizer', 'amf'],
		required: true,
		default: 'mains'
	},
	datetime: {
		type: Date,
		required: true,
		default: Date.now
	},
});


module.exports = mongoose.model("voltage_readings", voltageReadingSchema);
