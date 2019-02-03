import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined' || !bearerHeader) {
    res.status(403).json({
      status: '403',
      error: 'unauthorized access',
    });
  } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if (error) {
        res.status(400).json({
            status: '400',
            message: 'failed to decode the token'
        });
      }
      if (authData.response.isadmin === true) {
        req.userId = authData.response.id;
        next();
      } else if (authData.response.isadmin === false) {
        res.status(403).json({
          status: '403',
          error: 'not admin. access denied',
        });
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined' || !bearerHeader) {
    res.status(403).json({
      status: '403',
      message: 'unauthorized access',
    });
  } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretkey', (error, authData) => {
      if (error) {
        res.status(403).json({
          status: '403',
          message: 'token expired. log in again!',
        });
      }
      if (authData.response.isadmin === false) {
        req.userId = authData.response.id;
        next();
      } else if (authData.response.isadmin === true) {
        req.userId = authData.response.id;
        next();
      } else {
        res.status(403).json({
          status: '403',
          message: 'access denied',
        });
      }
    });
  }
};

export default {
  verifyAdmin,
  verifyUser,
};
