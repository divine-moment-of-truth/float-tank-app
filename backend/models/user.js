const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchemaModel = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  address: { type: String },
  telephone: { type: String },
  password: { type: String, require: true }
});

userSchemaModel.plugin(uniqueValidator);

module.exports = mongoose.model('UserSchemaModel', userSchemaModel);
