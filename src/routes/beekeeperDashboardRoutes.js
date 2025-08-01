const express = require('express');
const router = express.Router();
const getBeekeeperCounts = require('../controller/beekeeper.dashboard.controller'); // updated path and import

router.get('/counts', getBeekeeperCounts);

module.exports = router;
