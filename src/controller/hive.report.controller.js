const asyncHandler = require('express-async-handler');
const Hive = require('../model/hive.model');

// Function to fetch hives
const fetchHives = asyncHandler(async (req, res) => {
  try {
    const hives = await Hive.find();
    res.status(200).json(hives);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch hives: ${error.message}` });
  }
});

module.exports = { fetchHives };