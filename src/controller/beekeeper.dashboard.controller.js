const asyncHandler = require('express-async-handler');
const Beekeeper = require('../model/beekeeper.model');

// Function to get beekeeper counts
const getBeekeeperCounts = asyncHandler(async (req, res) => {
  try {
    const totalBeekeepers = await Beekeeper.countDocuments();
    const availableBeekeepers = await Beekeeper.countDocuments({ availability: true });
    const unavailableBeekeepers = totalBeekeepers - availableBeekeepers;

    const beekeeperCounts = {
      total: totalBeekeepers,
      available: availableBeekeepers,
      unavailable: unavailableBeekeepers,
    };

    res.status(200).json({ beekeepers: beekeeperCounts });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch beekeeper counts: ${error.message}` });
  }
});

module.exports = getBeekeeperCounts;
