import express from "express";
const router = express.Router();
import passport from "passport";
import accessTokenAutoRefresh from "../../middleware/accessTokenAuto";
import { CreateCategory } from "../../controllers/vendorController/categoryController";

router.post(
  "/createcategory",
//   accessTokenAutoRefresh,
//   passport.authenticate("jwt", { session: false }),
  CreateCategory
);


export default router;
