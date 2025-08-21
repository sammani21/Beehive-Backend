const { Router } = require("express");
const {
    
    getHive,
    
    getAllHives,
    
} = require("../controller/hive.controller");

const router = Router();


router.get("/:id", getHive);

router.get("/", getAllHives);


module.exports = router;