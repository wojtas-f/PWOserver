const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const db = require("../config/db.config");
const userValidationRules = require("../validators/users");
const validate = require("../validators/validator");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

/**
 * @swagger
 *
 * /users:
 *      get:
 *          tags:
 *              - users
 *          description: Get list of users
 *          responses:
 *              200:
 *                  description: List of users
 *              400:
 *                  description: Unable to get user list
 */
router.get("/users", async (req, res) => {
  const { rows } = await db.query(`SELECT * FROM Users;`);
  res.json(rows);
});

/**
 * @swagger
 *
 * /users/add:
 *      post:
 *          tags:
 *              - users
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
router.post("/users/add", userValidationRules(), validate, (req, res) => {
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
});

/**
 * @swagger
 *
 * /users/get/{id}:
 *      get:
 *          tags:
 *              - users
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
router.get("/users/get/:id", async (req, res) => {
  const id = req.params.id;
  console.log("user id:", id);
  const { rows } = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
  res.json(rows);
});

module.exports = router;
