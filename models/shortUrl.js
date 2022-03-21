const mongoose = require("mongoose");
const shortid = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: "string",
    required: true,
  },
  short: {
    type: "string",
    required: true,
    default: () => shortid.generate(),
  },
  clicks: {
    type: "Number",
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
