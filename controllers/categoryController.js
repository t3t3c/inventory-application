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
  res.redirect('/categories');
};

exports.deleteGet = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render('category_delete', {
      title: `Delete ${category.name}`,
      category,
    });
  } catch (error) {
    console.log('categoryController deleteGet error: ', error);
    next(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Promise.all([
      Bicycle.deleteMany({ category: req.params.id }),
      Category.findByIdAndDelete(req.params.id),
    ]);
    res.redirect('/categories');
  } catch (error) {
    console.log('categoryController deletePost: ', error);
    next(error);
  }
};

exports.updateGet = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render('category_update', {
      title: `Update ${category.name}`,
      category,
    });
  } catch (error) {
    console.log('categoryController updateGet error', error);
    next(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const categoryToUpdate = await Category.findById(req.params.id);
    categoryToUpdate.name = req.body.name;
    categoryToUpdate.description = req.body.description;
    await categoryToUpdate.save();
    res.redirect('/categories');
  } catch (error) {
    console.log('categoryController updatePost error', error);
    next(error);
  }
};
