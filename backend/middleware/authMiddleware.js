import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("================================");
  console.log("Authorization:", req.headers.authorization);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const token = req.headers.authorization?.split(" ")[1];

  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No Token Found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: error.message,
    });
  }
};