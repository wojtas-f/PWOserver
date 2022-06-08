const express = require("express");
const router = new express.Router();
const db = require("../config/db.config");

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

module.exports = router;
