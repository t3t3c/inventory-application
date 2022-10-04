const Category = require('../models/category');
const Bicycle = require('../models/bicycle');

exports.list = function (req, res, next) {
  Category.find().exec((err, categoryList) => {
    if (err) {
      console.log('categoryList, find(), controller error: ', err);
    } else {
      res.render('categories', { title: 'Category List', categoryList });
    }
  });
};

exports.filterByCategory = async function (req, res, next) {
  try {
    const BicycleAndCategory = await Promise.all([
      Bicycle.find({ category: req.params.id }).exec(),
      Category.findById(req.params.id).exec(),
    ]);
    console.log('promise finished');
    const filteredBicycles = BicycleAndCategory[0];
    const chosenCategory = BicycleAndCategory[1];
    res.render('category_filter', {
      title: chosenCategory.name,
      filteredBicycles,
    });
  } catch (error) {
    console.log('filterByCategory error: ', error);
  }
};

exports.addGet = (req, res) => {
  res.render('category_add', { title: 'Add category' });
};

exports.addPost = async (req, res) => {
  await Category.create(req.body);
  res.redirect('/categories')
};
