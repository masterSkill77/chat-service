// Accepte uniquement les requêtes relayées par la gateway Laravel
module.exports = function internalAuth(req, res, next) {
  const expected = process.env.INTERNAL_SERVICE_TOKEN;
  if (!expected || req.get("X-Internal-Token") !== expected) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
