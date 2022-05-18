const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const db = require("../db.config");
const { body, check, validationResult } = require("express-validator");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

/**
 * @swagger
 *
 * /user/add:
 *      post:
 *          tags:
 *              - user
 *          parameters:
 *            - in: body
 *              name: user
 *              description: The user to create.
 *              schema:
 *                type: object
 *                required:
 *                  - firstName
 *                  - lastName
 *                  - email
 *                properties:
 *                  firstName:
 *                    type: string
 *                    required: true
 *                  lastName:
 *                    type: string
 *                    required: true
 *                  email:
 *                    type: string
 *                    required: true
 *                  password:
 *                    type: string
 *                    required: true
 *          description: Create new user
 *          responses:
 *              200:
 *                  description: New user created
 *              400:
 *                  description: Unable to create user
 */
router.post(
  "/user/add",
  check("email")
    .isEmail()
    .custom(async (emailString) => {
      const { rows } = await db.query(`SELECT * FROM Users WHERE email = $1;`, [
        emailString,
      ]);
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
  (req, res) => {
    /**
     * Return error if any field is invalid
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    body.password = getHashedPassword(body.password);
    console.log(body);

    return res.json(body);
  }
);

/**
 * @swagger
 *
 * /user/{id}:
 *      get:
 *          tags:
 *              - user
 *          description: Get list of users
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: Numeric ID of the user to get
 *          responses:
 *              200:
 *                  description: List of users
 *              400:
 *                  description: Unable to get user list
 */
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log("user id:", id);
  const { rows } = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
  res.json(rows);
});

module.exports = router;
