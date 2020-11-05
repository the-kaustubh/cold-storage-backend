const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema( {
	uid: {
		type: String,
		required: true,
		unique: true,
		default: " "
	},
	name: {
		type: String,
		required: true,
		default: " "
	},
	location: {
		type: String,
		required: true,
		default: " "
	},
	user: {
		type:String,
		required: true,
		default: " "
	}
})

module.exports = mongoose.model('node', nodeSchema);
