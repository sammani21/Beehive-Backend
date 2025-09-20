const { Router } = require("express");

const {
    createBeekeeper,
    deleteBeekeeper,
    getAllBeekeepers,
    getBeekeeper,
    updateBeekeeper,
    toggleBeekeeperStatus
} = require("../controller/beekeeper.controller");

const router = Router();

router.post("/", createBeekeeper);
router.get("/:id", getBeekeeper);
router.put("/:id", updateBeekeeper);
router.get("/", getAllBeekeepers);
router.delete("/:id", deleteBeekeeper);
router.put("/:id/status", toggleBeekeeperStatus); // route for toggling beekeeper status

module.exports = router;
