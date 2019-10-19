import userModule from '../models/user. model'
exports.getLoginAuth = (req, res, next) => {
    res.json();
    next();
};
  
exports.getRegisterAuth = (req, res, next) => {
    res.status(200).json({
        message: userModule.UserRegitration
    });
    console.log(userModule.UserRegitration)
    next();
};
  