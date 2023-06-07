const express = require("express");
const app = express();
const connect = require("./config/db");
const usercontroller = require("./controllers/user.controller");
const moviecontroller = require("./controllers/movie.controller");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/user", usercontroller);
app.use("/movie", moviecontroller);

app.listen(port, async () => {
  try {
    await connect();
    console.log("Listening on port 8080");
  } catch (error) {
    console.log({ error: error.message });
  }
});
