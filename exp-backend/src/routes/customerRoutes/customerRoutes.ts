import express from "express";
const router = express.Router();
import passport from "passport";
import accessTokenAutoRefresh from "../../middleware/accessTokenAuto";
import {CustomerProfile} from "../../controllers/customerController/customerController/getCustomer";
import { DeleteCustomer } from "../../controllers/customerController/customerController";

router.get(
  "/customerprofile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  CustomerProfile
);

// router.put(
//   "/updatecustomer",
//   // accessTokenAutoRefresh,
//   // passport.authenticate("jwt", { session: false }),
//   UpdateCustomer
// );
router.delete(
  "/deletecustomer",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteCustomer
);

export default router;
