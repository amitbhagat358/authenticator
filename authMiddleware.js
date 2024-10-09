import jwt from "jsonwebtoken";
import User from "./userSchema.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
  } catch (err) {
    res.status(401).redirect('/login');
  }

  next();
};

export default authMiddleware;
