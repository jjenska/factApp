const asyncHandler = require("express-async-handler"); // to catch errors without try/catch
const Fact = require("../models/factModel");

// GET /api/facts
const getFacts = asyncHandler(async (request, response) => {
  const facts = await Fact.find();
  response.json(facts);
});

// POST /api/facts
const setFact = asyncHandler(async (request, response) => {
  if (!request.body.fact) {
    response.status(400);
    throw new Error("The fact field can't be empty");
  }
  const fact = await Fact.create({
    fact: request.body.fact,
    length: request.body.length,
  });
  response.json(fact);
});

// PUT /api/facts/:id
const updateFact = asyncHandler(async (request, response) => {
  const fact = await Fact.findById(request.params.id);

  if (!fact) {
    response.status(400);
    throw new Error("There is no fact found to update");
  }

  const updatedFact = await Fact.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(updatedFact);
});

// DELETE /api/facts/:id
const deleteFact = asyncHandler(async (request, response) => {
  const fact = await Fact.findById(request.params.id);

  if (!fact) {
    response.status(400);
    throw new Error("There is no fact found to delete");
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
