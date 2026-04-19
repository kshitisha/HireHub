import express from "express";
import {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
    updateJob,
    deleteJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);             // public — supports ?keyword=&location=&jobType=
router.get("/get/:id", getJobById);        // public
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;