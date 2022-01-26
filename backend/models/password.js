const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(6)
  .is()
  .max(50)
  .has()
  .uppercase(1)
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

module.exports = passwordSchema;
