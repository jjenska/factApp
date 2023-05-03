const mongoose = require("mongoose");

const factSchema = mongoose.Schema({
  fact: { type: String, required: true },
  length: { type: Number },
});

module.exports = mongoose.model("Fact", factSchema);
