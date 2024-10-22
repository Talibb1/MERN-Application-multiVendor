import express from "express";
const router = express.Router();
import upload from "../utils/storage";
import { handleCSVUpload } from "../services/uploadService";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";

router.post("/upload-csv", upload.single("file"), handleCSVUpload);

export default router;
