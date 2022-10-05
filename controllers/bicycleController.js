const Bicycle = require('../models/bicycle');
const Brand = require('../models/brand');
const Category = require('../models/category');

exports.list = (req, res, next) => {
  Bicycle.find()
    .populate('brand')
    .exec((err, bicycle_list) => {
      if (err) {
        console.log('Bicycle Querry error: ');
        return next(err);
      } else {
        // successful
        res.render('bicycle_list', { title: 'Bicycle List', bicycle_list });
      }
    });
};

exports.detail = (req, res, next) => {
  Bicycle.findById(req.params.id)
    .populate('brand')
    .populate('category')
    .exec((err, bicycle) => {
      if (err) {
        console.log('Bicycle detail querry error: ');
        return next(err);
      } else {
        res.render('bicycle_detail', { title: bicycle.name, bicycle });
      }
    });
};

exports.addGet = async (req, res, next) => {
  try {
    // return all brands after querry is finished
    const promise = await Promise.all([
      Brand.find().exec(),
      Category.find().exec(),
    ]);
    const brands = promise[0];
    const categories = promise[1];
    res.render('bicycle_add', { title: 'Add new bicycle', brands, categories });
  } catch (error) {
    console.log('bicycleController add error:', error);
  }
};

exports.addPost = async (req, res, next) => {
  // create a new bicycle based on a request
  const bicycle = await Bicycle.create(req.body);
  // redirect to bicycles to see new bicycle
  res.redirect('/bicycles');
};

exports.deleteGet = async (req, res) => {
  const bicycle = await Bicycle.findById(req.params.id).exec();
  res.render('bicycle_delete', { title: `Delete ${bicycle.name}`, bicycle });
};

exports.deletePost = async (req, res) => {
  try {
    await Bicycle.findByIdAndDelete(req.params.id);
    res.redirect('/bicycles');
  } catch (error) {
    console.log('bicycleController delete error');
    next(error);
  }
};

exports.updateGet = async (req, res, next) => {
  try {
    const [bicycle, categories, brands] = await Promise.all([
      Bicycle.findById(req.params.id).populate('brand').populate('category'),
      Category.find(),
      Brand.find(),
    ]);
    res.render('bicycle_update', {
      title: `Update ${bicycle.name}`,
      bicycle,
      categories,
      brands,
    });
  } catch (error) {
    console.log('bicycleController updateGet error', error);
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatedBicycle = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      category: req.body.category,
      brand: req.body.brand,
    };
    const bicycle = await Bicycle.findByIdAndUpdate(
      req.params.id,
      updatedBicycle,
      { new: true }
    );
    // we are returning the updated bicycle with the new option set to true
    // and redirect to the bicycle url adress
    res.redirect(bicycle.url);
  } catch (error) {
    console.log('bicycleController updateGet error', error);
    next(error);
  }
};
