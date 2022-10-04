const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.list);

// GET webside to add category
router.get('/add', categoryController.addGet);
// POST form information to add category
router.post('/add', categoryController.addPost);

// get detail
router.get('/:id', categoryController.filterByCategory);

module.exports = router;
