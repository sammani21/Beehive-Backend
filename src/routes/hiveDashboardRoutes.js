const express = require('express');
const router = express.Router();
const { getHives } = require('../controller/hive.dashboard.controller'); // Import as named export

router.get('/counts', getHives); // Use getHives directly

module.exports = router;