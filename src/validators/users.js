const { body } = require("express-validator");
const db = require("../config/db.config");

const validateCreateNewUser = () => {
  return [
    // Validate email address
    body("email")
      .isEmail()
      .bail()
      .custom(async (emailString) => {
        const { rows } = await db.query(
          `SELECT * FROM Users WHERE email = $1;`,
          [emailString]
        );
        if (rows.length > 0) {
          throw new Error("Email already in use");
        }
      }),
    // Validate password
    body("password")
      .isLength({ min: 9 })
      .withMessage("Password must be at least 9 characters long"),
    // Validate first name of a user
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    // Validate last name of a user
    body("lastName")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),
  ];
};

const validateGetUser = () => {
  return [
    body("email").isEmail().optional().withMessage("Incorrect email address"),
    body("id").isInt().optional().withMessage("Incorrect ID"),
  ];
};

module.exports = { validateCreateNewUser, validateGetUser };
