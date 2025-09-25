const express = require("express");
const router = express.Router();
const {
  getAllParts,
  searchByVinNo,
  searchParts,
} = require("../controllers/parts.controller");

router.get("/getAllParts", getAllParts);
router.get("/searchByVin", searchByVinNo);
router.get("/searchParts", searchParts);

module.exports = router;
