const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

module.exports = router;
