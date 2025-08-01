const asyncHandler = require('express-async-handler');
const Beekeeper = require('../model/beekeeper.model');

// Function to fetch beekeepers
const fetchBeekeepers = asyncHandler(async (req, res) => {
  try {
    const beekeepers = await Beekeeper.find();
    res.status(200).json(beekeepers);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch beekeepers: ${error.message}` });
  }
});

module.exports = { fetchBeekeepers };
