import express from "express";
const router = express.Router();
import { CreateOrg, DeleteOrg, GetOrg, UpdateOrg, updateUserOrg } from "../controllers/organization";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";


router.post(
    "/createorganization",
    // accessTokenAutoRefresh,
    // passport.authenticate("jwt", { session: false }),
    CreateOrg
  );
  router.get(
    "/getorganizations/:id",
    // accessTokenAutoRefresh,
    // passport.authenticate("jwt", { session: false }),
    GetOrg
  );
  router.put(
    "/updateuserorganizations",
    // accessTokenAutoRefresh,
    // passport.authenticate("jwt", { session: false }),
    updateUserOrg
  );
  router.put(
    "/updateorganizations/:id",
    // accessTokenAutoRefresh,
    // passport.authenticate("jwt", { session: false }),
    UpdateOrg
  );
  router.delete(
    "/deleteorganizations/:id",
    // accessTokenAutoRefresh,
    // passport.authenticate("jwt", { session: false }),
    DeleteOrg
  );


  export default router;