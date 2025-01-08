import multer from "multer";

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if(!allowedTypes.includes(file.mimetype)){
      const error = new Error('Incorrect file type');
      error.code = 'INCORRECT_FILETYPE';
      return cb(error, false);
    }
    cb(null, true);
  },
});

export default fileUpload;
