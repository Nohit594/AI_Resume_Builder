// middleware/validate.js
const { body, validationResult } = require("express-validator");

const validateResume = [
  body("resumeData.name").notEmpty().withMessage("Name is required."),
  body("resumeData.email").isEmail().withMessage("A valid email is required."),
  // Additional validations...
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateResume };
