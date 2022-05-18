const express = require("express");
const router = new express.Router();
const db = require("../db.config");

/**
 * @swagger
 *
 * /topic/all:
 *    get:
 *        tags:
 *            - topic
 *        description: Get list of topics
 *        responses:
 *            200:
 *                description: List of topics
 *            400:
 *                description: Unable to get topics list
 */
router.get("/topic/all", async (req, res) => {
  // const { rows } = await db.query(`SELECT * FROM Topics;`);
  // res.json(rows);
  res.json({ ok: "ok" });
});

module.exports = router;
