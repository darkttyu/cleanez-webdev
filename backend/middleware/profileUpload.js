import multer from "multer";

// Configure multer to use memory storage (store files in memory as Buffer)
const storage = multer.memoryStorage();

// Create a file upload middleware with configuration options
const profileUpload = multer({
  // Specify the storage option (memory storage in this case)
  storage: storage, 

  // Set file size limit to 10 MB (10 * 1024 * 1024 bytes)
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB
  },

  // Define a custom file filter to restrict file types
  fileFilter: (req, file, cb) => {
    // List of allowed MIME types for file uploads
    const allowedTypes = [
      'image/jpeg', // JPEG images
    ];

    // Check if the uploaded file type is allowed
    if (!allowedTypes.includes(file.mimetype)) {
      // Create a new error with a custom message and error code
      const error = new Error('Incorrect file type');
      error.code = 'INCORRECT_FILETYPE'; // Error code to identify incorrect file types
      return cb(error, false); // Return the error and stop the upload
    }
    cb(null, true); // Accept the file if the type is allowed
  },
});

// Export the file upload middleware to handle multiple file fields
export const uploadProfile = profileUpload.fields([
  { name: 'profile', maxCount: 1}, // Upload a single image for the profile; 
]);
