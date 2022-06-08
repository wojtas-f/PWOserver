const { body } = require("express-validator");
const db = require("../config/db.config");

const userValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .custom(async (emailString) => {
        const { rows } = await db.query(
          `SELECT * FROM Users WHERE email = $1;`,
          [emailString]
        );
        if (rows.length > 0) {
          throw new Error("Email already in use");
        }
      }),
    body("password")
      .isLength({ min: 9 })
      .withMessage("Password must be at least 9 characters long"),
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("lastName")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),
  ];
};

module.exports = userValidationRules;
