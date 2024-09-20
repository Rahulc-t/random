const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, 'mysecret');
    req.email = decoded.email;
    req.userType=decoded.userType
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: "Invalid token." });
  }
  next();
};

module.exports = verifyToken;