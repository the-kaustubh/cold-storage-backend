const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

const { expect } = chai;

chai.use(chaiHttp);

const tokenKaustubh = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthdXN0dWJoIiwiaW5zdGl0dXRlIjoianNwbSIsImRlc2lnbmF0aW9uIjoibWFpbnRlbmFuY2UiLCJpYXQiOjE2MDYyMDU0MTZ9.JWrbwBWFAOazi0nwzHtyaEirKMrCf-A23AO1_7HyWLQ";

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
		it("should work and return array", done => {
			chai
				.request(app)
				.get("/node")
				.set({"Authorization": `Bearer ${tokenKaustubh}` })
				.end((err, res) => {
					if(err) done(err);
					expect(res).to.have.status(200);
					expect(res.body).to.be.a("array");
					done();
				});
		});
	});
});

describe("users", () => {
	describe("POST /user/login", () => {
		it("should send access token", (done) => {
			chai
				.request(app)
				.post("/user/login")
				.send({
					"username": "kaustubh",
					"password": "kaustubh"
				})
				.end((err, res) => {
					if(err) done(err);

					expect(res).to.have.status(200);
					expect(res.body).to.be.a("object");
					expect(res.body.accessToken).to.be.a("string");
					done();
				});
		});

	});
});
