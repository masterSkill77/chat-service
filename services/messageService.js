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

const getMessage = async (to, from) => {
  return new Promise((resolve, reject) => {
    messageModel.find({ from, to }, "", (err, messagesFrom) => {
      if (err) reject(err);
      messageModel.find({ to: from, from: to }, "", (err, messagesTo) => {
        if (err) reject(err);
        resolve([...messagesFrom, ...messagesTo]);
      });
    });
  });
};

module.exports = {
  saveMessage,
  getMessage,
};
