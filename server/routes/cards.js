var express = require("express");
var router = express.Router();
const cards = require("../controllers/cards");

router.get("/", cards.getCards);

module.exports = router;
