const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const router = new express.Router();

const swaggerDefinition = {
  info: {
    title: "Thesis topic reservation system",
    version: "1.0.0",
    description: "Pracownia wytwarzania oprogramowania 1 - projekt",
  },
  host: "localhost:3000",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: [__dirname + "/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
router.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
