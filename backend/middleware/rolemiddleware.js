export const instructorOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "instructor") {
    return res.status(403).json({
      success: false,
      message: "Only instructors can perform this action.",
    });
  }

  next();
};