const mongoose = require("mongoose");

const factSchema = mongoose.Schema({
  fact: {
    type: String,
  },
});

module.exports = mongoose.model("Fact", factSchema);
