const express = require("express");
const app = express();

require("dotenv").config();
require("./dbConfig/dbConnection");

app.use(express.json());
const apiRouter = require("./router/apiRouter");

app.use("/api", apiRouter);
app.listen(process.env.PORT, console.log(`Server Run on ${process.env.PORT}`));
