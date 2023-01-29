const { now } = require("mongoose");
const messageModel = require("./../schemas/MessageSchema");

const saveMessage = async (to, from, content, type, extension = null) => {
  return new Promise((resolve, reject) => {
    const message = new messageModel({
      to,
      from,
      content,
      type,
      extension,
      time: now(),
    });
    message.save((error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const getMessage = async (from) => {
  return new Promise((resolve, reject) => {
    messageModel.find({ from }, "", (err, messages) => {
      if (err) reject(err);
      resolve(messages);
    });
  });
};

module.exports = {
  saveMessage,
  getMessage,
};
