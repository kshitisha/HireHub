import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email.", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePhoto = "";
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhoto = cloudResponse.secure_url;
            } catch (uploadError) {
                console.error("Photo upload failed:", uploadError);
                // Don't fail registration if photo upload fails
            }
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhoto || "",
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role.", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // ✅ JWT_SECRET

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,   // ✅ was httpsOnly (typo in original)
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: userData,
                success: true,
            });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }
        return res.status(200).json({ user, success: true });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        let user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        // Handle resume upload
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw", 
                });
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = req.file.originalname;
            } catch (uploadError) {
                console.error("Resume upload failed:", uploadError);
                return res.status(500).json({ message: "Resume upload failed.", success: false });
            }
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
            success: true,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};

// ================= UPDATE PROFILE PHOTO =================
export const updateProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please provide a photo.", success: false });
        }

        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findById(req.id);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        user.profile.profilePhoto = cloudResponse.secure_url;
        await user.save();

        return res.status(200).json({
            message: "Profile photo updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
            success: true,
        });
    } catch (error) {
        console.error("Update photo error:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};