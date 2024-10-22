import express from "express";
import passport from "passport";
const router = express.Router();
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";
import { DeleteUser, UpdateUser, UserProfile } from "../controllers/user";

router.get(
  "/userProfile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserProfile
);

router.delete(
  "/deleteuser/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteUser
);
router.put(
  "/updateuser/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateUser
);

export default router;
