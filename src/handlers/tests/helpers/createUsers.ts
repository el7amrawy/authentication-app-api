import { Users } from "../../../models/users";

const u = new Users();

(async () => {
  await u.create("89382832dcwd", "routesuser");
  await u.create("sdfds@mail", "1221212");
  await u.create("vbbvncx@mail", "122123jjekljkew12");
})();
