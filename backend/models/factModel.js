const mongoose = require("mongoose");

const factSchema = mongoose.Schema({
  fact: { type: String, required: true },
  length: { type: Number },
  breed: { type: String },
});

module.exports = mongoose.model("Fact", factSchema);
