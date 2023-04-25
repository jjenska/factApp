const express = require("express");
const router = express.Router();
const {
  getFacts,
  setFact,
  updateFact,
  deleteFact,
} = require("../controllers/factController");

router.route("/").get(getFacts).post(setFact);
router.route("/:id").put(updateFact).delete(deleteFact);

module.exports = router;
