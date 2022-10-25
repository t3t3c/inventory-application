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
}s
*/

const async = require('async');
const Bicycle = require('./models/bicycle');
const Category = require('./models/category');
const Brand = require('./models/brand');

var mongoose = require('mongoose');
var mongoDB =
  userArgs[0] ||
  'mongodb+srv://t3t3c:inventorypassword@inventory.nb74yzf.mongodb.net/bicycle_inventory?retryWrites=true&w=majority';
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
      function (callback) {
        brandCreate(
          'Bianchi',
          "Bianchi has played a core role in cycling and led the greatest riders to victory. And it's all going on by the new cutting-edge bikes",
          callback
        );
      },
      function (callback) {
        brandCreate(
          'Pinarello',
          'Historic manufacturer of racing bikes since 1951',
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
      function (callback) {
        categoryCreate('Mountain Bikes', 'You can ride anywhere!', callback);
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
          'Colnago G3-X DISC - Rival AXS - Carbon Gravel Bike',
          `While Colnago's Prestige, the evolution of one of the most successful cyclocross frames in history, was designed to let you ride as fast as possible for an hour on a technically demanding, dirty and uneven track, the new G3-X, by contrast, doesn't lock in so tightly.`,
          4650,
          2,
          categories[1],
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
      function (callback) {
        bicycleCreate(
          'CINELLI PRESSURE 2023',
          `Born to race, this monocoque high modulus carbon T700 fiber aero road bike is designed to cut through the air. Password: integrate!

          The new born Cinelli aerodynamic racing frame integrates anything possible: the special aero seat tube, the custom color FSA Vision Metron 5D ACR fully integrated aero handlebar, with integrated headset, cockpit and fork, for the cleanest cable routing solution and fastest racing geometry ever. The bicycle natural choice is for electronic groupset.`,
          4650,
          2,
          categories[0],
          brands[1],
          callback
        );
      },
      function (callback) {
        bicycleCreate(
          'CINELLI HOBOOTLEG GEO 2023',
          `The new Hobo GEO reaches the most mature and adventure reckless version ever: flared curve, tires up to 29×3.0, “anything you need eyelet” new fork, Shimano 2 front chainrings set up and easy maintenance hydraulic disc brake caliper coupled with a mechanical actuator. Three years of tests with the most expert and demanding off-road bike travellers lead to a revisited geometry and added the necessary features for this bike to be a pioneer in the explosive sector of self sufficiency travel.`,
          50650,
          2,
          categories[2],
          brands[1],
          callback
        );
      },
      function (callback) {
        bicycleCreate(
          'BIANCHI SPRINT DISC ULTEGRA 8000 BIKE',
          `The Bianchi Sprint is one of the best ways to get into serious road race performance without breaking the bank. The Sprint was brought into production over 50 years ago and it has taken its time evolving into a top-notch road bike that can do it all. This bike is excellent for long training sessions or Gran Fondos and can even hold its own in high-level road races. This version of the Bianchi Sprint is equipped with a Shimano Ultegra groupset. This 11-speed mechanical system is as efficient as it is affordable. It also contains disc brakes, making powerful and confident stopping possible in all weather conditions.`,
          5650,
          2,
          categories[0],
          brands[2],
          callback
        );
      },
      function (callback) {
        bicycleCreate(
          'BIANCHI VOLPE BIKE',
          `The Bianchi Velope was introduced back in the 80's as a cyclocross bike. It quickly evolved into an all-around machine that is ready for any situation. This bike can take on the road, traverse gravel, and even hold its own on single tracks. It is also a great choice for a commuter bike to simply make your way around the city. On the road, it is known for its comfort over long distances while still maintaining the proper speed you expect from Bianchi. With the responsiveness of a road bike and the durability of a mountain bike, there is not much that the Bianchi Volpe cannot handle.`,
          4650,
          2,
          categories[1],
          brands[2],
          callback
        );
      },
      function (callback) {
        bicycleCreate(
          'PINARELLO DOGMA F DISC 2022',
          `PERFECT FOR EVERY TYPE OF RIDER AND EVERY TERRAIN Real world riders aren't specialised - you need a bike that can climb, descend and sprint with equal flair

          DOGMA: IT DEVOURS THE ROAD Shoot uphill and fly down descents, attack every corner and make every watt count on the finishing straight
          
          THE NEWS ONDA FORK Pinarello made it twice to make sure you fly. Two completely different forks for two completely different braking systems.`,
          13585,
          2,
          categories[0],
          brands[3],
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
