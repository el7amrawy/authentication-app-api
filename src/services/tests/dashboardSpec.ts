import DashboardQueries from "../dashboard";
import { Users } from "../../models/users";

const d = new DashboardQueries();
const u = new Users();

describe("dashboard tests", () => {
  const email = "adbdasbbnads@sacbnmac.com",
    password = "asd734289ndsanas";
  it("expect getUserId to return an id", async () => {
    const user = await u.create(email, password);
    const res = await d.getUserId(email);
    expect(res.id).toBe(user.id);
  });
});
