const asyncHandler = require('express-async-handler');
const Hive = require('../model/hive.model');

const getHives = asyncHandler(async (req, res) => {
  try {
    const totalHives = await Hive.countDocuments();
    const activeHives = await Hive.countDocuments({ availability: true });
    const inactiveHives = totalHives - activeHives;

    const hiveCounts = {
      total: totalHives,
      active: activeHives,
      inactive: inactiveHives,
    };

    res.status(200).json({
      hives: hiveCounts,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch hive counts: ${error.message}` });
  }
});

module.exports = { getHives };