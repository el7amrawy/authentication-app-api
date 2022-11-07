import { Users } from "../../../models/users";

const u = new Users();
const test_mail = "routesuser@mail",
  test_pass = "89382832dcwd";

(async () => {
  const user = await u.create(test_mail, test_pass);
  await u.create("sdfds@mail", "1221212");
  await u.create("vbbvncx@mail", "122123jjekljkew12");
})();
export { test_mail, test_pass };
