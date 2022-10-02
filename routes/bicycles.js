const express = require('express');
const router = express.Router();

const bicycle_controller = require('../controllers/bicycleController');

router.get('/', bicycle_controller.bicycle_list);

module.exports = router;
