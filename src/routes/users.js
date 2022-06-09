const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const db = require("../config/db.config");
const {
  validateCreateNewUser,
  validateGetUser,
} = require("../validators/users");
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
 *      post:
 *          tags:
 *              - users
 *          description: Get list of users or a single user
 *          parameters:
 *              - in: body
 *                name: id
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      required: false
 *                    email:
 *                      type: string
 *                      required: false
 *          responses:
 *              200:
 *                  description: List of users
 *              400:
 *                  description: Unable to get user list
 */
router.post("/users", validateGetUser(), validate, async (req, res) => {
  const { id, email } = req.body;
  console.log("user id:", id);
  if (id) {
    const { rows } = await db.query(`SELECT * FROM Users WHERE id = $1;`, [id]);
    return res.json(rows);
  }

  console.log("user email:", email);
  if (email) {
    const { rows } = await db.query(`SELECT * FROM Users WHERE email = $1;`, [
      email,
    ]);
    return res.json(rows);
  }

  console.log("user:");
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
router.post("/users/add", validateCreateNewUser(), validate, (req, res) => {
  const body = req.body;
  body.password = getHashedPassword(body.password);
  console.log(body);

  return res.json(body);
});

module.exports = router;
