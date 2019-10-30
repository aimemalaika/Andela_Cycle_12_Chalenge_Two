import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  const tokenvalue = req.get('Authorisation');
  try {
    const decoded = jwt.verify(tokenvalue, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
    if (!decoded) {
      res.status(401).json({
        status: 401,
        message: 'invalid authentification',
      });
    }
    req.id = decoded.id;
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: 'request not authentified',
    });
  }
  next();
};
