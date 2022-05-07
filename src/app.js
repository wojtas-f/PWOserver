const express = require("express");
const cookieParser = require("cookie-parser");

const Swagger = require("./swagger");
const appRouter = require("./routes/app");
const userRouter = require("./routes/user");

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
app.use(userRouter);
app.use(appRouter);

module.exports = server;
