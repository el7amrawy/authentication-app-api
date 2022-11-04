import { Users } from "../../users";

const u = new Users();

(async () => {
  await u.create("lmaaaoo@email.com", "addsasa");
  await u.create("ndaajsdjas@mail", "asnjsdajjas");
  // console.log(await u.index());
})();
