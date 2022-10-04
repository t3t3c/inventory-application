const brand = require('../models/brand');
const Brand = require('../models/brand');
const Bicycle = require('../models/bicycle');

exports.list = (req, res, next) => {
  Brand.find().exec((err, brandsList) => {
    if (err) {
      console.log('Error in Brand Controller, Brand List', err);
    } else {
      res.render('brands_list', { title: 'Brands', brandsList });
    }
  });
};

exports.filter = async (req, res, next) => {
  try {
    // find bicycles that have a chosen brand
    const bicycleBrand = await Promise.all([
      Bicycle.find({ brand: req.params.id }).exec(),
      Brand.findById(req.params.id).exec(),
    ]);
    const filteredBicycles = bicycleBrand[0];
    const brand = bicycleBrand[1];
    res.render('brand_filter', { title: brand.name, filteredBicycles });
  } catch (error) {}
};

exports.addGet = (req, res, next) => {
  res.render('brand_add', { title: 'Add new brand' });
};

exports.addPost = async (req, res, next) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.redirect('/brands');
  } catch (error) {
    console.log('BrandController addPost error', error);
    next(error);
  }
};
