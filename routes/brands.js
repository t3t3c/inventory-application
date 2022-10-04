const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// List of brands
router.get('/', brandController.list);

// Add new bicycle GET webiste
router.get('/add', brandController.addGet);

// Add new bicycle POST information
router.post('/add', brandController.addPost);

// select a brand
router.get('/:id', brandController.filter);

module.exports = router;
