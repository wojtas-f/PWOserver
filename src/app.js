const express = require("express");
const cookieParser = require("cookie-parser");

const Swagger = require("./config/swagger");
const appRouter = require("./routes/app");
const usersRouter = require("./routes/users");
const topicRouter = require("./routes/topic");

const app = express();
const server = require("http").createServer(app);

/**
 * App
 */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(Swagger);
app.use(usersRouter);
app.use(topicRouter);
app.use(appRouter);

module.exports = server;
