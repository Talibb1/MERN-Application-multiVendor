import express from "express";
const router = express.Router();
import {
  CreateTeam,
  DeleteTeam,
  GetTeam,
  UpdateTeam,
} from "../controllers/teamManagement";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";
import checkRole from "../middleware/checkRole";

router.post(
  "/createteam",
  // checkRole(["ADMIN", "SUPERADMIN"]),
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  CreateTeam
);
router.get(
  "/getteams/:id",
  // checkRole(["ADMIN", "SUPERADMIN"]),
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetTeam
);
router.put(
  "/updatteam",
  // checkRole(["ADMIN", "SUPERADMIN"]),
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateTeam
);
router.delete(
  "/deleteteam",
  // checkRole(["ADMIN"]),
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteTeam
);

export default router;
