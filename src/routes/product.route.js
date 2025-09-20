const { Router } = require("express");

const {
    getProduct,
    getAllProducts,
    approveProduct
} = require("../controller/product.controller");

const router = Router();

router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.patch("/:id/approval", approveProduct);

module.exports = router;