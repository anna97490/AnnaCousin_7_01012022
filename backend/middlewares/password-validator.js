const passwordSchema = require('../models/password');

// Validation du password
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message: 'The password must contain between 6 and 70 characters, 1 uppercase letter and 1 number.',
    });
  } else {
    next();
  }
};
