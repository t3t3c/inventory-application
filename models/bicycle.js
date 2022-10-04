const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bicylceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
});

bicylceSchema.virtual('url').get(function () {
  return `/bicycles/${this._id}`;
});

module.exports = mongoose.model('Bicycle', bicylceSchema);
