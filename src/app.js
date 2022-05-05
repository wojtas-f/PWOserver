const express = require("express");

const Swagger = require("./swagger");

const app = express();
const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.get("/user", (req, res) => {
  const users = [
    { name: "Name1", content: "Surname1" },
    { name: "Name2", content: "Surname2" },
    { name: "Name3", content: "Surname3" },
    { name: "Name4", content: "Surname4" },
  ];
  res.json(users);
});
app.use(Swagger);

module.exports = server;
