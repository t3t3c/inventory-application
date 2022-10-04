const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const app = express();

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// make public folder publice
app.use(express.static(path.join(__dirname, 'public')));
// show information about the connection
app.use(logger('dev'));
// make express handle the forms:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MONGOOSE

const uri =
  'mongodb+srv://t3t3c:inventorypassword@inventory.nb74yzf.mongodb.net/bicycle_inventory?retryWrites=true&w=majority';

mongoose.connect(
  uri,
  () => {
    console.log('Connected to the database');
  },
  (err) => {
    console.log(err);
  }
);

// HOMEPAGE

app.get('/', (req, res) => {
  res.render('index');
});

// ROUTES

const bicycleRouter = require('./routes/bicycles');
app.use('/bicycles', bicycleRouter);

const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);

const brandsRouter = require('./routes/brands');
app.use('/brands', brandsRouter);

// Error

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!' + err.stack);
});

app.listen(process.env.PORT || 3000);
