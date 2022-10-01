#! /usr/bin/env node

console.log(
  'This script populates bicycles and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

const async = require('async');
const Bicycle = require('./models/bicycle');
const Category = require('./models/category');
const Brand = require('./models/brand');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(
  mongoDB,
  () => {
    console.log('connected');
  },
  (err) => {
    console.log(err);
  }
);
// this is a legacy code from older examples
// mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bicycles = [];
const categories = [];
const brands = [];

function bicycleCreate(
  name,
  description,
  price,
  numberInStock,
  category,
  brand,
  callback
) {
  bicycleDetail = { name, description, price, numberInStock };
  // checks for optional data:
  if (category != false) {
    bicycleDetail.category = category;
  }
  if (brand != false) {
    bicycleDetail.brand = brand;
  }
  const bicycle = new Bicycle(bicycleDetail);
  bicycle.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    } else {
      console.log('New Bicycle: ' + bicycle);
      bicycles.push(bicycle);
      callback(null, bicycle);
    }
  });
}

function categoryCreate(name, description, callback) {
  const category = new Category({ name, description });

  category.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    callback(null, category);
  });
}

function brandCreate(name, description, callback) {
  const brand = new Brand({ name, description });

  brand.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand);
    callback(null, brand);
  });
}

function createBrands(cb) {
  async.series(
    [
      function (callback) {
        brandCreate(
          'Colnago',
          'Colnago is a manufacturer of high quality road-racing bicycles founded by Ernesto Colnago near Milano in Cambiago, Italy',
          callback
        );
      },
      function (callback) {
        brandCreate(
          'Cinelli',
          'Originally established in 1947, Cinelli is world renowned for their truly innovative bikes, Avant-guard designs, but most of all, for their true love of cycling and the cycling community.',
          callback
        );
      },
    ],
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate('Road', 'If asphalt is your friend', callback);
      },
      function (callback) {
        categoryCreate('Gravel', 'If gravel is your friend', callback);
      },
    ],
    cb
  );
}

function createBicycles(cb) {
  async.parallel(
    [
      // Colnago bikes
      // Road
      function (callback) {
        bicycleCreate(
          'C68 Road',
          'The C68 frame is made in Italy and is the result of more than 4 years of research, It represents the continuity of the history of a company that has collected successes and innovations for more than 68 years.',
          5500,
          1,
          categories[0],
          brands[0],
          callback
        );
      },
      function (callback) {
        bicycleCreate(
          'NEMO GRAVEL 2022',
          `The Nemo Gravel is a 100% Made-in-Italy all-road racing icon. The frame is TIG-welded from contemporary oversized Columbus Spirit HSS triple tubes, cold-drawn and triple-butted in Columbus' Milan factory. Geometries have been developed for riders used to and appreciative of reactive road bike handling and maximum tyre clearance is 40mm.`,
          4650,
          2,
          categories[1],
          brands[1],
          callback
        );
      },
    ],
    cb
  );
}

function test() {
  console.log('jestem tu');
}

async.series(
  [createCategories, createBrands, createBicycles],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('All done');
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
