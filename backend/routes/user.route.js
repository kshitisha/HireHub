import express from "express";
import {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    updateProfilePhoto,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

// Profile routes
router.get("/profile", isAuthenticated, getProfile);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.post("/profile/photo", isAuthenticated, singleUpload, updateProfilePhoto);

export default router;