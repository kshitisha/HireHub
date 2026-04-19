import Job from "../models/job.model.js";

// ================= POST JOB =================
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements: typeof requirements === "string"
                ? requirements.split(",").map((r) => r.trim())
                : requirements,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position: Number(position),
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({ message: "Job created successfully.", job, success: true });
    } catch (error) {
        console.error("Post job error:", error);
        return res.status(500).json({ message: "Failed to create job.", success: false });
    }
};

// ================= GET ALL JOBS (with filters) =================
export const getAllJobs = async (req, res) => {
    try {
        const { keyword, location, jobType, experienceLevel } = req.query;

        const filter = {};

        // Keyword searches title and description
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ];
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (jobType) {
            filter.jobType = { $regex: jobType, $options: "i" };
        }

        if (experienceLevel) {
            filter.experienceLevel = { $regex: experienceLevel, $options: "i" };
        }

        const jobs = await Job.find(filter)
            .populate({ path: "company", select: "name logo location" })
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error("Get all jobs error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch jobs." });
    }
};

// ================= GET JOB BY ID =================
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate({ path: "company", select: "name logo location" })
            .populate("applications");

        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Get job by ID error:", error);
        return res.status(500).json({ message: "Failed to fetch job.", success: false });
    }
};

// ================= GET ADMIN JOBS =================
export const getAdminJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ created_by: req.id })
            .populate({ path: "company", select: "name logo location" })
            .sort({ createdAt: -1 });

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error("Get admin jobs error:", error);
        return res.status(500).json({ message: "Failed to fetch jobs.", success: false });
    }
};

// ================= UPDATE JOB =================
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (requirements) updateData.requirements = typeof requirements === "string"
            ? requirements.split(",").map((r) => r.trim())
            : requirements;
        if (salary) updateData.salary = Number(salary);
        if (location) updateData.location = location;
        if (jobType) updateData.jobType = jobType;
        if (experienceLevel) updateData.experienceLevel = experienceLevel;
        if (position) updateData.position = Number(position);

        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({ message: "Job updated successfully.", job, success: true });
    } catch (error) {
        console.error("Update job error:", error);
        return res.status(500).json({ message: "Failed to update job.", success: false });
    }
};

// ================= DELETE JOB =================
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, created_by: req.id });
        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized.", success: false });
        }

        return res.status(200).json({ message: "Job deleted successfully.", success: true });
    } catch (error) {
        console.error("Delete job error:", error);
        return res.status(500).json({ message: "Failed to delete job.", success: false });
    }
};