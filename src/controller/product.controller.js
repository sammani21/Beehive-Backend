const tryCatch = require("../utils/TryCatch");
const ProductModel = require("../model/product.model");

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
    const product = await ProductModel.findOne({ id: req.params.id });
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
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
        const errorResponse = { statusCode: 400, msg: `Invalid status. Must be one of: ${validStatuses.join(", ")}` };
        return res.status(400).json(errorResponse);
    }

    // If rejecting, require a reason
    if (status === "rejected" && !rejectionReason) {
        const errorResponse = { statusCode: 400, msg: "Rejection reason is required when rejecting a product" };
        return res.status(400).json(errorResponse);
    }

    const product = await ProductModel.findByIdAndUpdate(
        id,
        {
            status,
            ...(status === "rejected" && { rejectionReason }),
            reviewedAt: new Date(),
        },
        { new: true, runValidators: true }
    ).populate("beekeeper");

    if (!product) {
        const errorResponse = { statusCode: 404, msg: `Product with ID ${id} not found` };
        return res.status(404).json(errorResponse);
    }

    // Send notification to the beekeeper (non-blocking)
    sendProductStatusNotification(product).catch((err) => {
        console.error("Failed to send notification:", err);
    });

    const response = { statusCode: 200, msg: `Product ${status} successfully`, data: product };
    res.status(200).json(response);
});

/**
 * Helper function to send notifications to beekeeper
 */
async function sendProductStatusNotification(product) {
    const { beekeeper, productName, status, rejectionReason } = product;

    // Email notification
    const emailSubject = `Your product ${productName} has been ${status}`;
    let emailContent = `Dear ${beekeeper.firstName},\n\n`;

    if (status === "approved") {
        emailContent += `Your product "${productName}" has been approved and is now available on our platform.\n\n`;
        emailContent += `Thank you for your contribution!\n\nBeekeepers Team`;
    } else if (status === "rejected") {
        emailContent += `We regret to inform you that your product "${productName}" has been rejected.\n\n`;
        emailContent += `Reason: ${rejectionReason}\n\n`;
        emailContent += `Please review our product guidelines and submit again.\n\nBeekeepers Team`;
    }

    try {
        await sendEmail(beekeeper.email, emailSubject, emailContent);
        console.log(`Notification sent to beekeeper: ${beekeeper.email}`);
    } catch (error) {
        console.error("Failed to send notification:", error);
    }
}
