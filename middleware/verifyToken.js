const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // added Bearer + " "
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        res.status(403).json("Token is not valid!!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!!");
  }
};

exports.verifyTokenAndAuthorization = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id ) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!!");
    }
  });
};

exports.verifyTokenAndAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};
