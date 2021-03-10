const Freezer			= require("./models/freezer.js")
const authenticateToken = require("./authToken");

async function getFreezer(uid) {
	let freezer;
	try {
		freezer = await Freezer.find({
			uid: uid
		}).sort({
			datetime: -1
		});
		return freezer[0];
	} catch( e ) {
		console.log(e.message);
	}
}

module.exports = getFreezer;
