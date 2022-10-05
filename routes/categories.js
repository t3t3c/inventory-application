const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.list);

// GET webside to add category
router.get('/add', categoryController.addGet);
// POST form information to add category
router.post('/add', categoryController.addPost);

// GET website to delete
router.get('/:id/delete', categoryController.deleteGet);
// POST webiste to delete
router.post('/:id/delete', categoryController.deletePost);

// GET website to update
router.get('/:id/update', categoryController.updateGet);
// POST form to update
router.post('/:id/update', categoryController.updatePost);

// get detail
router.get('/:id', categoryController.filterByCategory);

module.exports = router;
