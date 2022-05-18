const express = require("express");
const router = new express.Router();
const db = require("../db.config");
const { body, validationResult } = require("express-validator");

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
  const { rows } = await db.query(`SELECT * FROM topics;`);
  res.json(rows);
  // res.json({ ok: "ok" });
});

/**
 * @swagger
 *
 * /topic/add:
 *      post:
 *          tags:
 *              - topic
 *          parameters:
 *            - in: body
 *              name: topic
 *              description: The topic to create.
 *              schema:
 *                type: object
 *                required:
 *                  - author
 *                  - title
 *                  - description
 *                properties:
 *                  author:
 *                    type: number
 *                    required: true
 *                  title:
 *                    type: string
 *                    required: true
 *                  description:
 *                    type: string
 *                    required: true
 *          description: Create new topic
 *          responses:
 *              200:
 *                  description: New topic created
 *              400:
 *                  description: Unable to create topic
 */
router.post(
  "/topic/add",
  body("author").exists().withMessage("Author ID is required"),
  body("title")
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters long"),
  body("description")
    .isLength({ min: 40 })
    .withMessage("Description must be at least 40 characters long"),
  (req, res) => {
    /**
     * Return error if any field is invalid
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    console.log(body);

    return res.json(body);
  }
);

module.exports = router;
