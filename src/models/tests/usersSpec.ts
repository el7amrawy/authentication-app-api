import { User, Users } from "../users";

const u = new Users();

describe("users model tests", () => {
  it("expect 'index' to return atleast one user", async () => {
    const users: User[] = await u.index();

    expect(users[0]).toBeDefined;
  });

  it("expect 'create' to return a new user", async () => {
    const newUser: User = await u.create("ali@mail.com", "saaddasds");

    expect(newUser.email.length).toBeGreaterThan(0);
  });

  it("expect 'show' to return a user", async () => {
    const user = await u.create("mail@mail.com", "passdaasdsaewq");

    const oldUser: User = await u.show(user.id);

    expect(oldUser.id).toBe(user.id);
  });

  it("expect 'delete' to remove a user", async () => {
    const user = await u.create("dasdss@mail.com", "dadsadadd");
    const deletedUser: User = await u.delete(user.id);
    expect(deletedUser.id).toBe(user.id);
  });

  it("expect update to return different values", async () => {
    const user = await u.create("email@email", "assasa");

    const updateUser = await u.update({
      id: user.id,
      email: "kljkkjkj@email",
    });
    expect(updateUser.email).not.toBe(user.email);
  });
});
