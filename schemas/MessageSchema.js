// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: Number,
  to: Number,
  content: String,
  type: String,
  extension: String,
  time: Number,
});

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel;
