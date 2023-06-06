const express = require("express");
const app = express();
require("dotenv").config();

const usersRouter = require("./routes/users.router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/users", usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...........");
});