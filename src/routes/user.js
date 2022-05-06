const express = require("express");
const router = new express.Router();
const users = require("../data/users.json");
const crypto = require("crypto");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

/**
 * @swagger
 *
 * /user/all:
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
router.get("/user/all", (req, res) => {
  res.json(users);
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
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
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
  const { email, firstName, lastName, password } = req.body;
  console.log(users.users);
  if (users.find((user) => user.email === email)) {
    return res.json({
      msg: "User already registered.",
    });
  }

  // Store user into the database if you are using one
  users.push({
    firstName,
    lastName,
    email,
    password: getHashedPassword(password),
  });

  return res.json(users);
});

module.exports = router;
