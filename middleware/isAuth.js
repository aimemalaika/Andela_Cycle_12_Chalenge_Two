import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  const tokenvalue = req.get('Authorization');
  try {
    const decoded = jwt.verify(tokenvalue, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
    if (!decoded) {
      return res.status(401).json({
        status: 401,
        message: 'request not authentified',
      });
    }
    req.id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'request not authentified',
    });
  }
};
