const { nextTick } = require('async');
const express = require('express');
const router = express.Router();
const Bicycle = require('../models/bicycle');
const Brand = require('../models/brand');
const Category = require('../models/category');

router.get('/', async (req, res, next) => {
  try {
    // returns numbers of all bicycles, brands and categories
    const [bicycle, brand, category] = await Promise.all([
      Bicycle.countDocuments({}).exec(),
      Brand.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
    ]);
    res.render('index', { title: 'Home Page', bicycle, brand, category });
  } catch (error) {
    console.log('home get error: ', error);
    next(error);
  }
});

module.exports = router;
