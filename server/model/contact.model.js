const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    phone: Number,
    email: String,
  },
  { versionKey: false }
);

const Contact = mongoose.model("contact", schema);

module.exports = Contact;
