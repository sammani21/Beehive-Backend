const tryCatch = require("../utils/TryCatch");
const ProductModel = require("../model/product.model");
const BeekeeperModel = require("../model/beekeeper.model");

/**
 * Get all products
 */
exports.getAllProducts = tryCatch(async (req, res) => {
    const products = await ProductModel.find();
    const response = { statusCode: 200, msg: "OK", data: products }; 
    res.status(200).json(response);
});

/**
 * Get a single product
 */
exports.getProduct = tryCatch(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} product not found!` };
        return res.status(404).json(errorResponse);
    }
    const response = { statusCode: 200, msg: "OK", data: product };
    res.status(200).json(response);
});

/**
 * Approve or reject a product (Admin only)
 * Also sends notification to the beekeeper
 */
exports.approveProduct = tryCatch(async (req, res) => {
    const { productName } = req.params;   // using productName from URL params
    const { status, rejectionReason } = req.body;

    // Validate status
    const validStatuses = ["approved", "rejected"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            statusCode: 400,
            msg: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        });
    }

    // Require rejection reason
    if (status === "rejected" && !rejectionReason) {
        return res.status(400).json({
            statusCode: 400,
            msg: "Rejection reason is required when rejecting a product"
        });
    }

    // First fetch product (to get beekeeper info)
    const product = await ProductModel.findOne({ productName: productName });
    if (!product) {
        return res.status(404).json({
            statusCode: 404,
            msg: `Product with name "${name}" not found`
        });
    }

    // Update product by productName
    const updatedProduct = await ProductModel.findOneAndUpdate(
        { productName: productName },
        {
            status,
            ...(status === "rejected" && { rejectionReason }),
            reviewedAt: new Date(),
        },
        { new: true, runValidators: true }
    );

    // Get beekeeper details
    const beekeeper = await BeekeeperModel.findOne({ no: product.beekeeper });

    if (beekeeper?.email) {
        const emailSubject = `Your product ${updatedProduct.productName} has been ${status}`;
        let emailContent = `Dear ${beekeeper.username},\n\n`;

        if (status === "approved") {
            emailContent += `Your product "${updatedProduct.productName}" has been approved and is now available on our platform.\n\n`;
            emailContent += `Thank you for your contribution!\n\nBeeKeepers Team`;
        } else {
            emailContent += `We regret to inform you that your product "${updatedProduct.productName}" has been rejected.\n\n`;
            emailContent += `Reason: ${updatedProduct.rejectionReason}\n\n`;
            emailContent += `Please review our product guidelines and submit again.\n\nBeeKeepers Team`;
        }

        try {
            await sendEmail(beekeeper.email, emailSubject, emailContent);
            console.log(`Notification sent to beekeeper: ${beekeeper.email}`);
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    }

    res.status(200).json({
        statusCode: 200,
        msg: `Product ${status} successfully and email sent to beekeeper`,
        data: updatedProduct
    });
});
