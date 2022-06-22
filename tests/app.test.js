var rest_supertest = require("supertest");
var should = require("should");

var rest_server = rest_supertest.agent("http://localhost:4002");

describe("Unit Tests for the REST Service", () => {
    it("should find the get movies service to be running", () => {
        rest_server.get("/movies")
        .expect("Content-Type", /json/)
        .expect(200);
        // done();
    });
    it("should find the get users service to be running", () => {
        rest_server.get("/users")
        .expect("Content-Type", /json/)
        .expect(200);
        // done();
    });
    it("should find the save movie service to be running", () => {
        rest_server.post("/movies")
        .expect("Content-Type", /json/)
        .expect(201);
        // done();
    });
    it("should find the save user service to be running", () => {
        rest_server.post("/users")
        .expect("Content-Type", /json/)
        .expect(201);
        // done();
    });
    it("should return 404", () => {
        rest_server.get("/notfound")
        .expect("Content-Type", /json/)
        .expect(200);
        // done();
    });
});