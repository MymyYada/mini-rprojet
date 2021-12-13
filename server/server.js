const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const charactersRouter = require("./routes/characters-route");
const PORT = process.env.PORT || 4001;

const app = express();
app.use(helmet()); // Security for HTTP Header's vulnerability
app.use(compression()); // Middleware for improve application speed
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // bodyParser allows to read req.body

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
