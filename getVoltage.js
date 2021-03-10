const Voltage			= require("./models/voltage.js")
const authenticateToken = require("./authToken");

async function getVoltage(uid) {
	let voltage;
	try {
		amf = await Voltage.find({ uid: uid, place: 'amf' })
			.sort({ datetime: -1 });
		mains = await Voltage.find({ uid: uid, place: 'mains' })
			.sort({ datetime: -1 });
		stab = await Voltage.find({ uid: uid, place: 'stabilizer' })
			.sort({ datetime: -1 });
		return {
			amf: amf,
			mains: mains,
			stab: stab
		}
	} catch( e ) {
		console.log(e.message);
	}
}

module.exports = getVoltage;
