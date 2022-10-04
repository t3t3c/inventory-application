const express = require('express');
const router = express.Router();

const bicycleController = require('../controllers/bicycleController');

// List of bicycles
router.get('/', bicycleController.list);

// Create a bicycle form
router.get('/add', bicycleController.addGet);

// response POST
router.post('/add', bicycleController.addPost);

// Bicycle delete GET
router.get('/:id/delete', bicycleController.deleteGet);

// Bicycle delete POST
router.post('/:id/delete', bicycleController.deletePost);

// Bicycle details
router.get('/:id', bicycleController.detail);

module.exports = router;
