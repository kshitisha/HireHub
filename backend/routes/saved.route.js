import express from "express";
import { toggleSavedJob, getSavedJobs } from "../controllers/saved.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Toggle save/unsave a job (bookmark)
router.route("/toggle/:jobId").post(isAuthenticated, toggleSavedJob);

// Get all saved jobs for the logged-in user
router.route("/").get(isAuthenticated, getSavedJobs);

export default router;