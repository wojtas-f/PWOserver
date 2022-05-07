const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const db = require("../db.config");

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
 *              - user
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
 * /user/add:
 *      post:
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
 *          tags:
 *              - user
 *          description: Get list of users
 *          responses:
 *              200:
 *                  description: List of users
 *              400:
 *                  description: Unable to get user list
 */
router.post("/user/add", (req, res) => {
  const body = req.body;
  body.password = getHashedPassword(body.password);
  console.log(body);

  return res.json(body);
});

module.exports = router;
