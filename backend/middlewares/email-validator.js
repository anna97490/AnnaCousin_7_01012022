const emailValidator = require('email-validator');

// Validation du mail
module.exports = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    res.status(400).json({ message: 'Please enter a valid email address' });
  } else {
    next();
  }
};
