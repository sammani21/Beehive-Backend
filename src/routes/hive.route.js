const { Router } = require("express");
const {
    deleteHive,
    getHive,
    createHive,
    getAllHives,
    updateHive
} = require("../controller/hive.controller");

const router = Router();

router.post("/", createHive);
router.get("/:id", getHive);
router.put("/:id", updateHive);
router.get("/", getAllHives);
router.delete("/:id", deleteHive);

module.exports = router;