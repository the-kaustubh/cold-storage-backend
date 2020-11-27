const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

const { expect } = chai;

chai.use(chaiHttp);

const mockUser = {
	username: "kaustubh",
	email: "kaustubh.murumkar@gmail.com",
	password: "blahblah",
	institute: "jsom",
	designation: "user"
};

let accTok = "";

const mockNode = {
	"uid": "100000",
	"location": "jsom",
	"name": "ups",
	"supply": {
		"mains": {
			"r": "0",
			"y": "0",
			"b": "0"
		},
		"amf": {
			"r": "0",
			"y": "0",
			"b": "0"
		},
		"stabilizer": {
			"r": "0",
			"y": "0",
			"b": "0"
		}
	}
};

describe("construct users", () => {
	// User should not exist
	describe("POST /user/login", () => {
		it("should return a error message", done => {
			chai
				.request(app)
				.post("/user/login")
				.send({
					username: mockUser.username,
					password: mockUser.password
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(400);
					expect(res.body).to.be.an("object");
					expect(res.body).to.have.property("message");
					done();
				});
		});
	});

	// Create user
	describe("POST /user/register", () => {
		it("should create new user", (done) => {
			chai
				.request(app)
				.post("/user/register")
				.send(mockUser)
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res).to.be.a("object");
					expect(res.body).to.have.property("username");
					expect(res.body).to.have.property("email");
					expect(res.body).to.have.property("password");
					expect(res.body).to.have.property("institute");
					expect(res.body).to.have.property("designation");
					done();
				});
		});
	});

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
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res).to.be.an("object");
					expect(res.body).to.have.property("accessToken");
					accTok = res.body.accessToken;
					expect(res.body).to.have.property("designation");
					done();
				});
		});
	});

	// Login with wrong password
	describe("POST /user/login", () => {
		it("should return a error message", done => {
			chai
				.request(app)
				.post("/user/login")
				.send({
					username: mockUser.username,
					password: "xyz"
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("object");
					expect(res.body).to.have.property("message");
					done();
				});
		});
	});

	// Login with wrong username and password
	describe("POST /user/login", () => {
		it("should return a error message", done => {
			chai
				.request(app)
				.post("/user/login")
				.send({
					username: "abcd",
					password: "xyz"
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(400);
					expect(res.body).to.be.an("object");
					expect(res.body).to.have.property("message");
					done();
				});
		});
	});
});

describe("nodes", () => {
	describe("GET /node", () => {
		it("should be unauthorized", (done) => {
			chai
				.request(app)
				.get("/node")
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(401);
					done();
				});
		});
	});

	describe("GET /node", () => {
		it("should return empty array", (done) => {
			chai
				.request(app)
				.get("/node")
				.set({
					"Authorization": "Bearer " + accTok
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array").that.is.empty;
					done();
				});
		});
	});

	describe("POST /node/add", () => {
		it("should add a new node", done => {
			chai
				.request(app)
				.post("/node/add")
				.send(mockNode)
				.set({
					"Authorization": "Bearer " + accTok
				})
				.end((err, res) => {
					if(err) done(err);
					expect(res).to.have.status(201);
					expect(res.body).to.be.an("object");
					expect(res.body).to.have.property("node");
					expect(res.body).to.have.property("reading");
					expect(res.body.node).to.have.property("user");
					expect(res.body.node.user).to.equal(mockUser.username);
					done();
				});
		});
	});

	describe("GET /node", () => {
		it("should return previously added node", (done) => {
			chai
				.request(app)
				.get("/node")
				.set({
					"Authorization": "Bearer " + accTok
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array");
					expect(res.body.length).to.equal(1);
					done();
				});
		});
	});

	describe("DELETE /node/uid", () => {
		it("should delete the created node", done => {
			chai
				.request(app)
				.delete("/node/"+mockNode.uid)
				.set({
					"Authorization": "Bearer " + accTok
				})
				.end((err, res) => {
					if(err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.equal("Deleted Successfully");
					done();
				});
		});
	});

	describe("GET /node", () => {
		it("should again return empty array", (done) => {
			chai
				.request(app)
				.get("/node")
				.set({
					"Authorization": "Bearer " + accTok
				})
				.end((err, res) => {
					if (err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array").that.is.empty;
					done();
				});
		});
	});
});

