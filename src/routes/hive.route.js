const { Router } = require("express");
const {
    
    getHive,
    updateHiveStatus,
    getAllHives,
    
} = require("../controller/hive.controller");

const router = Router();


router.get("/:id", getHive);

router.get("/", getAllHives);
router.patch('/:id/status', updateHiveStatus);


module.exports = router;