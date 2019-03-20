function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).json("Access Denied!");
  next();
}

module.exports = { admin };
