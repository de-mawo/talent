

// Auth guard to check allowed user to access a resource
const checkUserRole = (allowedRole) => async (req, res, next) => {
  const { user } = req;

  if (!user || (user.role && user.role !== allowedRole)) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};
export const isAdmin = checkUserRole("ADMIN");
export const isUser = checkUserRole("USER");
