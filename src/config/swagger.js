const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const router = new express.Router();

const swaggerDefinition = {
  info: {
    title: "System rezerwacji projektów",
    version: "1.0.0",
    description: "",
  },
  basePath: "/",
};
const routesPath = path.join(__dirname, "..", "routes", "*.js");
const options = {
  swaggerDefinition,
  apis: [routesPath],
};

const swaggerSpec = swaggerJSDoc(options);
router.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = router;
