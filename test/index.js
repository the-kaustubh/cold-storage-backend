const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../index")

const { expect } = chai

chai.use(chaiHttp)

let accTok = ''

describe("users", () => {
	// Create user
	const mockUser = {
		username: 'kaustubh',
		email: 'kaustubh.murumkar@gmail.com',
		password: 'blahblah',
		institute: 'jsom',
		designation: 'maintenance'
	}
	describe("POST /user/register", () => {
		it("should create new user", (done) => {
			chai
				.request(app)
				.post("/user/register")
				.send(mockUser)
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(200)
					expect(res).to.be.a('object')
					expect(res.body).to.have.property('username')
					expect(res.body).to.have.property('email')
					expect(res.body).to.have.property('password')
					expect(res.body).to.have.property('institute')
					expect(res.body).to.have.property('designation')
					done()
				})
		})
	})

	// Login User
	describe("POST /user/login", () => {
		it("should login successfully", done => {
			chai
				.request(app)
				.post("/user/login")
				.send({
					username: mockUser.username,
					password: mockUser.password
				})
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(200)
					expect(res).to.be.an('object')
					expect(res.body).to.have.property('accessToken')
					accTok = res.body.accessToken
					expect(res.body).to.have.property('designation')
					done()
				})
		})
	})

	// Login with wrong password
	describe("POST /user/login", () => {
		it("should return a error message", done => {
			chai
				.request(app)
				.post('/user/login')
				.send({
					username: mockUser.username,
					password: 'xyz'
				})
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(200)
					expect(res.body).to.be.an('object')
					expect(res.body).to.have.property('message')
					done()
				})
		})
	})

	// Login with wrong username and password
	describe("POST /user/login", () => {
		it("should return a error message", done => {
			chai
				.request(app)
				.post('/user/login')
				.send({
					username: 'abcd',
					password: 'xyz'
				})
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(400)
					expect(res.body).to.be.an('object')
					expect(res.body).to.have.property('message')
					done()
				})
		})
	})
})

describe("nodes", () => {
	describe("GET /node", () => {
		it("should be unauthorized", (done) => {
			chai
				.request(app)
				.get("/node")
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(401)
					done()
				})
		})
	})

	describe("GET /node", () => {
		it("should return empty array", (done) => {
			chai
				.request(app)
				.get("/node")
				.set({
					'Authorization': 'Bearer ' + accTok
				})
				.end((err, res) => {
					if (err) done(err)
					expect(res).to.have.status(200)
					expect(res.body).to.be.an('array')
					done()
				})
		})
	})
})

