// jshint esversion: 9
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", () => {
  throw new Error("unable to connect to database");
});
test("2+2 equals 4", () => {
  expect(2 + 2).toBe(4);
});
