import supertest from "supertest";
import { User, Users } from "../../models/users";
import app from "../../server";
import { test_pass, test_mail } from "./helpers/createUsers";

const req = supertest(app);
const u = new Users();

describe("userRoutes tests", () => {
  it("expect server to return a new user <'/users' post>", async () => {
    const res = await req
      .post("/users")
      .send({ email: test_mail, password: test_pass });
    const user = res.body.user;
    expect(user.email).toBe(test_mail);
  });

  it("expect server to return an authToken <'/users/auth' post>", async () => {
    const mail = "mail@mail",
      pass = "pass";
    const user = await u.create(mail, pass);

    const res = await req
      .post("/users/auth")
      .send({ id: user.id, password: pass });
    const { token } = res.body;
    expect(token.length).toBeGreaterThan(0);
  });

  it("expect server to return a list of users <'/users get'>", async () => {
    const mail = "mail2@mail",
      pass = "passasdsa";
    const { id } = await u.create(mail, pass);
    const { token } = (
      await req.post("/users/auth").send({ id, password: pass })
    ).body;
    const res = await req.get("/users").set({ Authorization: `test ${token}` });
    const users: User[] = res.body;
    expect(users.length).toBeGreaterThan(1);
  });

  it("expect server to return a user <'/users/:id' get>", async () => {
    const mail = "mail3@mail",
      pass = "passasdsawdew";
    const { id } = await u.create(mail, pass);
    const { token } = (
      await req.post("/users/auth").send({ id, password: pass })
    ).body;
    const res = await req
      .get(`/users/${id}`)
      .set({ Authorization: `test ${token}` });
    const user: User = res.body;
    expect(user.id).toBe(id);
  });

  it("expect server to update an exiting user <'/users/:id post'>", async () => {
    const mail = "mail4@mail",
      pass = "passasdsadsdswdew";
    const { id } = await u.create(mail, pass);
    const { token } = (
      await req.post("/users/auth").send({ id, password: pass })
    ).body;

    const user: User = {
      id,
      email: "adsndasmnm@mail",
    };
    const res = await req
      .post(`/users/${id}`)
      .send({ user })
      .set({ Authorization: `test ${token}` });

    expect(res.body.email).not.toBe(mail);
  });

  it("expect server to delete a user <'/user/:id delete'>", async () => {
    const mail = "mail3@mail",
      pass = "passasdsawdew";
    const { id } = await u.create(mail, pass);
    const { token } = (
      await req.post("/users/auth").send({ id, password: pass })
    ).body;

    const res = await req
      .delete(`/users/${id}`)
      .set({ Authorization: `test ${token}` });

    const user: User = res.body;
    expect(user.email).toBe(mail);
  });
});
