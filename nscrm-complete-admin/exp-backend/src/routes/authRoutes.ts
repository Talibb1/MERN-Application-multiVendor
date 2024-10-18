import express from "express";
const router = express.Router();
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";
import { Changepassword, Login, Logout, Register } from "../controllers/auth";

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

export default router;
