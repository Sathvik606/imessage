import express from "express";
import { checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

console.log("Auth route loaded");
// /api/auth/check
router.get("/check", protectRoute, checkAuth);

export default router;