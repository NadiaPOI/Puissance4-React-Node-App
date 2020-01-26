const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("./server");
const request = supertest(app);

beforeEach(() => {
  //real database
  mongoose
    .set("useCreateIndex", true)
    .connect("mongodb://localhost:27017/usersTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

describe("GET/users", () => {
  it("Should return a response with succes", async () => {
    const response = await request.get("/users");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST/login", () => {
  it("Should return success response when an existing user logged", async () => {
    const response = await request.post("/login").send({
      email: "x@gmail.com",
      password: "tdd"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe("Authentication successful");
  });

  it("Should return error when empty data", async () => {
    const response = await request.post("/login").send({
      email: "",
      password: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.text).toBe("Bad request");
  });

  it("Should return error response when an non-existent user logged", async () => {
    const response = await request.post("/login").send({
      email: "xavier@gmail.com",
      password: "tdd"
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.text).toBe("User does not exist");
  });

  it("Should return error response when an existing user logged with wrong password", async () => {
    const response = await request.post("/login").send({
      email: "x@gmail.com",
      password: "tgd"
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.text).toBe("Wrong password");
  });
});

describe("POST/signup", () => {
  it("Should respond with succes when a user signed up", async () => {
    // User déja existant car ajouté ds le test, il faut le supprimer au prealable
    const users = await request.get("/users");
    const zenUserId = users.body[users.body.length - 1]["_id"];

    await request.delete(`/users/${zenUserId}`).send();

    const response = await request.post("/signup").send({
      firstname: "Zen",
      email: "zenika@gmail.com",
      password: "zen"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.text).toBe("Succes, new user saved");
  });

  it("Should return error when empty data", async () => {
    const response = await request.post("/signup").send({
      firstname: "",
      email: "",
      password: ""
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.text).toBe("Bad request");
  });

  it("Should respond with error when a existing user signed up", async () => {
    const response = await request.post("/signup").send({
      firstname: "Xavier",
      email: "x@gmail.com",
      password: "tdd"
    });

    expect(response.statusCode).toBe(405);
    expect(response.body.text).toBe("User already exists");
  });
});

describe("DELETE/user/:id", () => {
  it("Should respond with succes when a existing user is deleted and redirect", async () => {
    const userId = "5de684efd47cad19788e146a";
    const response = await request.delete(`/users/${userId}`).send();

    expect(response.statusCode).toBe(302);
    expect(response.redirect).toBe(true);
  });

  it("Should respond with error when error", async () => {
    const userId = "a";
    const response = await request.delete(`/users/${userId}`).send();

    expect(response.statusCode).toBe(500);
  });
});

afterEach(done => {
  mongoose.disconnect(done);
});
