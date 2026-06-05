const router = require("express").Router();

const {
  addWater,
  getWater,
  updateWater,
  deleteWater,
} = require("../controllers/waterController");

router.post("/", addWater);

router.get("/:user_id", getWater);

router.put("/:id", updateWater);

router.delete("/:id", deleteWater);

module.exports = router;