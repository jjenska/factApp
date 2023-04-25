const asyncHandler = require("express-async-handler");

// @desc    Get facts
// @route   GET /api/facts
const getFacts = asyncHandler(async (request, response) => {
  response.json({ fact: "random fact" });
});

// @desc    Set fact
// @route   POST /api/facts
const setFact = asyncHandler(async (request, response) => {
  if (!request.body.text) {
    response.status(400);
    throw new Error("please add a text field");
  }
  response.json({ fact: "set random fact" });
});
// @desc    Update fact
// @route   PUT /api/facts/:id
const updateFact = asyncHandler(async (request, response) => {
  response.json({ fact: `update fact ${request.params.id}` });
});
// @desc    Delete facts
// @route   DELETE /api/facts/:id
const deleteFact = asyncHandler(async (request, response) => {
  response.json({ fact: `delete fact ${request.params.id}` });
});

module.exports = {
  getFacts,
  setFact,
  updateFact,
  deleteFact,
};
