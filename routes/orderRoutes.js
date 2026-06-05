const router = require("express").Router();

const {
  placeOrder,
} = require("../controllers/orderController");

router.post("/", placeOrder);

module.exports = router;