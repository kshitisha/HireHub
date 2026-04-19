import multer from "multer";

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/jpg", 
        "image/png",
        "image/webp",
        "application/pdf",
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images and PDF files are allowed."), false);
    }
};

export const singleUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}).single("file");