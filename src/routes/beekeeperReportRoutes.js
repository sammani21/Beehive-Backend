const express = require('express');
const { fetchBeekeepers } = require('../controller/beekeeper.report.controller');

const router = express.Router();

router.route('/').get(fetchBeekeepers);

module.exports = router;
