const express = require("express");

const Swagger = require("./swagger");
const userRouter = require("./routes/user");

const app = express();
const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.use(Swagger);
app.use(userRouter);

module.exports = server;
