import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { issueController } from "./issues.controller.js";


const router =Router();

router.post('/issue',verifyJWT, issueController.create)
router.get("/issues", issueController.getAll);
router.get("/issues/:id", issueController.getSingleIssue);
router.patch(
  "/issues/:id",
  verifyJWT,
  issueController.updateIssue
);

export default router;