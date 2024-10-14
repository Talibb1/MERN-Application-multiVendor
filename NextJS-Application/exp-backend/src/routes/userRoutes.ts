import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";
import { Register, Login, Changepassword, Logout } from "../controllers/auth";
import {
  CreateLead,
  DeleteLead,
  GetLeadById,
  GetLeads,
  UpdateLead,
} from "../controllers/leads";
import { DeleteUser, UpdateUser, UserProfile } from "../controllers/user";
import {
  CreateContact,
  DeleteContact,
  GetContactById,
  GetContacts,
  UpdateContact,
} from "../controllers/contacts";
import { handleCSVUpload } from "../services/uploadService";
import upload from "../utils/storage";
import {
  CreateNotes,
  DeleteNoteById,
  GetNotesByLeadId,
  UpdateNoteById,
} from "../controllers/note";
import { checkRole } from "../middleware/checkRole";
import { CreateTeam, DeleteTeam, GetTeam, UpdateTeam } from "../controllers/teamManagement";
import { CreateOrg, DeleteOrg, GetOrg, UpdateOrg } from "../controllers/organization";

// Public Routes
router.post("/register", Register);
router.post("/login", Login);

router.post(
  "/changepassword",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  Changepassword
);

router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  Logout
);
// router.post("/forgotpassword", ForgotPassword);
// router.post("/passwordreset", PasswordReset);

// user profile routes
// router.get(
//   "/tokens",
//   setAuthHeader,
//   passport.authenticate("jwt", { session: false }),
//   newAccessTokenController
// );

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
//            *****************   Lead Management Routes   ********************
router.post(
  "/createleads",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  CreateLead
);
router.get(
  "/getleads",
  // passport.authenticate("jwt", { session: false }),
  // accessTokenAutoRefresh,
  // checkRole(['admin', 'superadmin']),
  GetLeads
);

router.delete(
  "/deleteleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteLead
);
router.put(
  "/updateleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateLead
);
router.get(
  "/getleads/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetLeadById
);

//             ***************  Contact Management Routes ***************
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


//             ***************  Note Management Routes ***************
router.post(
  "/createnotes",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  CreateNotes
);

router.get(
  "/getleadnotes/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetNotesByLeadId
);

router.delete(
  "/deletenote/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteNoteById
);
router.put(
  "/updatenote/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateNoteById
);

//             ***************  Organization Management Routes ***************
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

//             ***************  Team Management Routes ***************
router.post(
  "/createteam",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  CreateTeam
);
router.get(
  "/getteams/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  GetTeam
);
router.put(
  "/updatteam/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  UpdateTeam
);
router.delete(
  "/deleteteam/:id",
  // accessTokenAutoRefresh,
  // passport.authenticate("jwt", { session: false }),
  DeleteTeam
);


// Upload CSV
router.post("/upload-csv", upload.single("file"), handleCSVUpload);

export default router;
