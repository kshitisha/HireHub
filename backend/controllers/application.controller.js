import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// ================= APPLY FOR JOB =================
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required.", success: false });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        const existing = await Application.findOne({ job: jobId, applicant: userId });
        if (existing) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false });
        }

        const application = await Application.create({ job: jobId, applicant: userId });

        job.applications.push(application._id);
        await job.save();

        return res.status(201).json({ message: "Applied successfully.", success: true });
    } catch (error) {
        console.error("Apply job error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= GET MY APPLIED JOBS =================
export const getAppliedJobs = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.id })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: { path: "company", select: "name logo location" },
            });

        return res.status(200).json({ application: applications, success: true });
    } catch (error) {
        console.error("Get applied jobs error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= GET APPLICANTS FOR A JOB (RECRUITER) =================
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                // ✅ Populate full profile so recruiter sees skills, resume, photo
                select: "fullname email phoneNumber profile",
            },
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Get applicants error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= UPDATE APPLICATION STATUS =================
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: "Status is required.", success: false });
        }

        const validStatuses = ["pending", "accepted", "rejected"];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
                success: false,
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Status updated successfully.", success: true });
    } catch (error) {
        console.error("Update status error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};