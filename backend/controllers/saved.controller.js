import User  from "../models/user.model.js";
import Job  from "../models/job.model.js";

// POST /api/v1/saved/toggle/:jobId
export const toggleSavedJob = async (req, res) => {
    try {
        const userId = req.id; // from isAuthenticated middleware
        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        const user = await User.findById(userId);

        const alreadySaved = user.savedJobs.includes(jobId);

        if (alreadySaved) {
            // Unsave / remove bookmark
            user.savedJobs = user.savedJobs.filter(
                (id) => id.toString() !== jobId
            );
            await user.save();
            return res.status(200).json({
                message: "Job removed from saved.",
                saved: false,
                success: true
            });
        } else {
            // Save / bookmark
            user.savedJobs.push(jobId);
            await user.save();
            return res.status(200).json({
                message: "Job saved successfully.",
                saved: true,
                success: true
            });
        }
    } catch (error) {
        console.error("toggleSavedJob error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// GET /api/v1/saved/
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).populate({
            path: "savedJobs",
            populate: {
                path: "company",
                select: "name logo location"
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });
    } catch (error) {
        console.error("getSavedJobs error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};