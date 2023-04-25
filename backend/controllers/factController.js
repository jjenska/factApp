const asyncHandler = require("express-async-handler");
const Fact = require("../models/factModel");

// @desc    Get facts
// @route   GET /api/facts
const getFacts = asyncHandler(async (request, response) => {
  const facts = await Fact.find();
  response.json(facts);
});

// @desc    Set fact
// @route   POST /api/facts
const setFact = asyncHandler(async (request, response) => {
  if (!request.body.fact) {
    response.status(400);
    throw new Error("please add a text field");
  }
  const fact = await Fact.create({
    fact: request.body.fact,
  });
  response.json(fact);
});
// @desc    Update fact
// @route   PUT /api/facts/:id
const updateFact = asyncHandler(async (request, response) => {
  const fact = await Fact.findById(request.params.id);

  if (!fact) {
    response.status(400);
    throw new Error("Fact is not found");
  }

  const updatedFact = await Fact.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(updatedFact);
});
// @desc    Delete facts
// @route   DELETE /api/facts/:id
const deleteFact = asyncHandler(async (request, response) => {
  const fact = await Fact.findById(request.params.id);

  if (!fact) {
    response.status(400);
    throw new Error("Fact is not found");
  }

  const deleted = await fact.deleteOne();
  const reply = `Fact ${deleted.fact} deleted`;

  response.json(reply);
});

module.exports = {
  getFacts,
  setFact,
  updateFact,
  deleteFact,
};
