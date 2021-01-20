const Voltage			= require("../models/voltage.js")
const authenticateToken = require("../authToken");

async function getVoltage(uid) {
	let voltage;
	try {
		voltage = await Voltage.find({
			uid: uid
		}).sort({
			datetime: -1
		});
		return voltage
	} catch( e ) {
		console.log(e.message);
	}
}

module.exports = getVoltage;
