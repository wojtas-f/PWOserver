const express = require("express");
const router = new express.Router();

/**
 * @swagger
 *
 * /:
 *    get:
 *        tags:
 *            - app
 *        description: Get api description
 *        responses:
 *            200:
 *                description: Api description
 *            400:
 *                description: Unable to get api response
 */
router.get("/", (req, res) => {
  const output =
    '<ul><li><a href="/api-docs">/api-docs</a></li><li><a href="/swagger.json">/swagger.json</a></li></ul>';
  res.send(output);
});

module.exports = router;
