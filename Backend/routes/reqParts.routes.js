const express = require("express");
const router = express.Router();

const {
  sendProductInfoController,
} = require("../controllers/reqParts.controller");

router.post("/reqPart", sendProductInfoController);

module.exports = router;
