const mongoose = require("mongoose");

const freezerReadingSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	power: {
		type: Number,
		required: true,
		default: 0
	},
	temperature: {
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

module.exports = mongoose.model("freezer_readings", freezerReadingSchema);
