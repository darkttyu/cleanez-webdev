import multer from "multer";

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', // PDF files
      'application/msword', // Microsoft Word (DOC)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Microsoft Word (DOCX)
      'image/jpeg', // JPEG images
      'image/png', // PNG images
      'image/gif' // GIF images
    ];
    
    if(!allowedTypes.includes(file.mimetype)){
      const error = new Error('Incorrect file type');
      error.code = 'INCORRECT_FILETYPE';
      return cb(error, false);
    }
    cb(null, true);
  },
});

export const uploadDocuments = fileUpload.fields([
  { name: 'resume', maxCount: 1},
  { name: 'ID1', maxCount: 1},
  { name: 'ID2', maxCount: 1}
]);
