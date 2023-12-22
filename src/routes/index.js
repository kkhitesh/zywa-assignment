const express = require("express");
const { getCardStatus } = require("../service/cardService");

const router = express.Router();

router.get("/get_card_status", getCardStatus);

module.exports = router;
