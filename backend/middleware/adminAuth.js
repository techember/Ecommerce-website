import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token has an id (means it's a valid token)
    if (!decodedToken.id) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    // If the token has a role, check if it's admin
    if (decodedToken.role && decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required!" });
    }

    // Attach user info to request for use in controllers
    req.userId = decodedToken.id;
    req.userRole = decodedToken.role;

    next();
  } catch (error) {
    console.log("Error while authenticating admin: ", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token!" });
  }
};

export default adminAuth;
