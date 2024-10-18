import express from "express";
const router = express.Router();
import {
  CreateContact,
  DeleteContact,
  GetContactById,
  GetContacts,
  UpdateContact,
} from "../controllers/contacts";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";



router.post(
  "/createcontacts",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  CreateContact
);
router.get(
  "/getcontacts",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetContacts
);
router.delete(
  "/deletecontacts/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteContact
);
router.put(
  "/updatecontacts/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateContact
);
router.get(
  "/getcontacts/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetContactById
);


export default router