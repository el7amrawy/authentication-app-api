import { User, Users } from "../users";

const user: User = {
  email: "ali@mail.com",
  password: "fmfsf.sfsfd",
};

const u = new Users();

describe("users model tests", () => {
  it("expect 'create' to return a new user", async () => {
    const newUser = await u.create(user.email, user.password);
    expect(newUser.email.length).toBeGreaterThan(0);
  });
});
