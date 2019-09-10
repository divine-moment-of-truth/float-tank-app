const mongoose = require('mongoose');

const tankSchemaModel = mongoose.Schema({
  // _id: { type: String, required: true },
  date: { type: String, required: true },
  tankNumber: { type: Number, required: true },
  sessionOne: { type: Boolean, required: true },
  sessionTwo: { type: Boolean, required: true },
  sessionThree: { type: Boolean, required: true },
  sessionFour: { type: Boolean, required: true },
  sessionFive: { type: Boolean, required: true }
});

module.exports = mongoose.model('TankSchemaModel', tankSchemaModel);
