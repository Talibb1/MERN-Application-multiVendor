import express from "express";
const router = express.Router();
import {
  CreateNotes,
  DeleteNoteById,
  GetNotesByLeadId,
  UpdateNoteById,
} from "../controllers/note";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAuto";


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

export default router