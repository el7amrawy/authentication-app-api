import { User, Users } from "../users";

const user = {
  id: "",
  email: "ali@mail.com",
  password: "fmfsf.sfsfd",
};

const u = new Users();

describe("users model tests", () => {
  it("expect 'create' to return a new user", async () => {
    const newUser: User = await u.create(user.email, user.password);
    user.id = newUser.id;

    expect(newUser.email.length).toBeGreaterThan(0);
  });

  it("expect 'show' to return a user", async () => {
    const oldUser: User = await u.show(user.id);

    expect(oldUser.id).toBe(user.id);
  });

  it("expect 'index' to return atleast one user", async () => {
    const users: User[] = await u.index();

    expect(users.length).toBeGreaterThan(0);
  });
});
