const DG			= require("./models/dg")
const authenticateToken = require("./authToken");

async function getDG(uid) {
	let dg;
	try {
		dg = await DG.find({
			uid: uid
		}).sort({
			datetime: -1
		});
		return dg[0]
	} catch( e ) {
		console.log(e.message);
	}
}

module.exports = getDG;
