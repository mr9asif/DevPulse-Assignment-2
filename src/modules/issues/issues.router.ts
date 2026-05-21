import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { issueController } from "./issues.controller.js";


const router =Router();

router.post('/issue',verifyJWT, issueController.create)


export default router;