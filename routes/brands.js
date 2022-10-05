const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const brand = require('../models/brand');

// List of brands
router.get('/', brandController.list);

// Add new bicycle GET webiste
router.get('/add', brandController.addGet);

// Add new bicycle POST information
router.post('/add', brandController.addPost);

// GET a delete brand page
router.get('/:id/delete', brandController.deleteGet);
// POST information to delete
router.post('/:id/delete', brandController.deletePost);

// GET a update brand page
router.get('/:id/update', brandController.updateGet);
// POST a update brand page
router.post('/:id/update', brandController.updatePost);

// select a brand
router.get('/:id', brandController.filter);

module.exports = router;
