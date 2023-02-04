const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rest-api");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to database::MongoDB");
});

module.exports = db;
