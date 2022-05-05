const express = require("express");
const router = new express.Router();

/**
 * @swagger
 *
 * /users:
 *      get:
 *          tags:
 *              - user
 *          description: Get list of users
 *          responses:
 *              201:
 *                  description: List of users
 *              400:
 *                  description: Unable to get user list
 */
router.get("/users", (req, res) => {
  const users = [
    { name: "Name1", content: "Surname1" },
    { name: "Name2", content: "Surname2" },
    { name: "Name3", content: "Surname3" },
    { name: "Name4", content: "Surname4" },
  ];
  res.json(users);
});

module.exports = router;
