const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = mongoose.model(
  "User",
  new Schema({
    id: ObjectId,
    name: "string",
    email: "string",
    password: "string",
  })
);

module.exports = User;
