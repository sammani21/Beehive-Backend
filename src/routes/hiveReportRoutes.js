const express = require('express');
const { fetchHives } = require('../controller/hive.report.controller');

const router = express.Router();

router.route('/').get(fetchHives);

module.exports = router;