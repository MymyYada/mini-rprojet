const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const charactersRouter = require("./routes/characters-route");
const PORT = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Characters route
app.use("/characters", charactersRouter);

// 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});

// 404 error route
app.use(function (req, res, next) {
  res.status(404).send("Sorry we could not find that.");
});

// Start express
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
