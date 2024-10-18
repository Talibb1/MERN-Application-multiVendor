import express from "express";
const router = express.Router();
import {
  CreateLead,
  DeleteLead,
  GetLeadById,
  GetLeads,
  UpdateLead,
} from "../controllers/leads";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";
import checkRole from "../middleware/checkRole";

router.post(
  "/createleads",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  // checkRole(["ADMIN", "SUPERADMIN"]),
  CreateLead
);

router.get(
  "/getleads",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  // checkRole(["ADMIN", "SUPERADMIN", "USER", "RESTRICTED"]),
  GetLeads
);

router.delete(
  "/deleteleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  // checkRole(["ADMIN", "SUPERADMIN"]),
  DeleteLead
);

router.put(
  "/updateleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  // checkRole(["ADMIN", "SUPERADMIN"]),
  UpdateLead
);

router.get(
  "/getleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  // checkRole(["ADMIN", "SUPERADMIN", "USER", "RESTRICTED"]),
  GetLeadById
);

export default router;
