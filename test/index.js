const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

const { expect } = chai

chai.use(chaiHttp)

describe('nodes', () => {
	describe("GET /node", () => {
		it('should return array off all nodes', (done) => {
			chai
				.request(app)
				.get('/node')
				.end((err, res) => {
					if (err) done(err)
					res.should.have.status(200)
					res.should.be.a('array')
					done();
				})
		})
	})
})
