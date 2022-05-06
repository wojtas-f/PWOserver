const express = require("express");
const router = new express.Router();

/**
 * @swagger
 *
 * /:
 *      get:
 *          tags:
 *              - app
 *          description: Get api description
 *          responses:
 *              200:
 *                  description: Api description
 *              400:
 *                  description: Unable to get api response
 */
router.get("/", (req, res) => {
  res.json({
    app: "REST API",
    routes: [{ path: "/api-docs" }, { path: "/swagger.json" }],
  });
});

module.exports = router;
