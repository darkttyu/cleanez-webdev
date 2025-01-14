import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Check for the token in authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false, 
      message: "Unauthorized, no token provided."
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token is invalid if there's no decoded data
    if (!decoded) {
      return res.status(401).json({
        success: false, 
        message: "Unauthorized. Invalid Token."
      });
    }

    // Attach the userId from decoded token to req.userId
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken: ", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
