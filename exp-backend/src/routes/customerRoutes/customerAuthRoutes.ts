import express from "express";
const router = express.Router();
import passport from "passport";
import accessTokenAutoRefresh from "../../middleware/accessTokenAuto";
import {
  CancelOtpRequest,
  ChangeCustomerPassword,
  ForgetCustomerPassword,
  LoginCustomer,
  LogoutCustomer,
  PasswordResetCustomer,
  RegisterCustomer,
  ResendCustomerOtp,
  VerifyCustomerOtp,
} from "../../controllers/customerController/customerAuthController";

router.post("/register", RegisterCustomer);
router.post("/login", LoginCustomer);
router.post("/forgotpassword", ForgetCustomerPassword);
router.post("/passwordreset", PasswordResetCustomer);
router.post("/resendotp", ResendCustomerOtp);
router.post("/verifyotp", VerifyCustomerOtp);
router.post("/cancelotp", CancelOtpRequest);

router.post(
  "/changepassword",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  ChangeCustomerPassword
);
router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  LogoutCustomer
);

export default router;
