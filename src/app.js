const express = require("express");
const cookieParser = require("cookie-parser");

const Swagger = require("./routes/swagger");
const appRouter = require("./routes/app");
const userRouter = require("./routes/user");

const app = express();
const server = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(Swagger);
app.use(userRouter);
app.use(appRouter);

module.exports = server;
