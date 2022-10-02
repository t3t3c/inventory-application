const { nextTick } = require('async');
const Bicycle = require('../models/bicycle');
// always import models you want to populate
const Brand = require('../models/brand');

exports.bicycle_list = (req, res, next) => {
  Bicycle.find()
    .populate('brand')
    .exec((err, bicycle_list) => {
      if (err) {
        console.log('Bicycle Querry error: ');
        return next(err);
      } else {
        console.log(bicycle_list);
        // successful
        res.render('bicycle_list', { title: 'Bicycle List', bicycle_list });
      }
    });
};
