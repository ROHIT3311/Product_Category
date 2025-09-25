// validators/authValidator.js
const { body } = require("express-validator");

const commonDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "rediffmail.com",
];

module.exports.registerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .matches(/^[A-Z][a-z]*$/)
    .withMessage("First Name must start with a capital letter"),

  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .matches(/^[A-Z][a-z]*$/)
    .withMessage("Last Name must start with a capital letter"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required")
    .custom((email) => {
      const domain = email.split("@")[1];
      if (commonDomains.includes(domain)) {
        throw new Error(
          "Public email domains are not allowed. Use your official email."
        );
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),

  body("pid").notEmpty().withMessage("PID is required"),
];
