const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchemaModel = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  address: { type: String },
  telephone: { type: String },
  password: { type: String, require: true },
  bookings: [{
    tank: { type: String },
    date: { type: String },
    notes: { type: String }
  }]
});

userSchemaModel.plugin(uniqueValidator);

module.exports = mongoose.model('UserSchemaModel', userSchemaModel);
