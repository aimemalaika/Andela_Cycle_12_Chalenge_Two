import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  const tokenvalue = req.get('Authorization');
  try {
    const decoded = jwt.verify(tokenvalue, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
    req.id = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: 'request not authentified',
    });
  }
};
