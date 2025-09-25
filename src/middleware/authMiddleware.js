const jwt = require("jsonwebtoken");

const auth = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded biasanya ada { emp_id, role, divisi_id }

      // cek role
      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: akses ditolak" });
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = auth;
