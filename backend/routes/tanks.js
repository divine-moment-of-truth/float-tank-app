const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TankSchemaModel = require('../models/tank');

// create a tank
router.post(
  '',
  checkAuth,
  (req, res, next) => {
    const tank = new TankSchemaModel({
      date: '18-10-2019',
      tankNumber: 1,
      sessionOne: false,
      sessionTwo: true,
      sessionThree: false,
      sessionFour: false,
      sessionFive: true
      /* date: req.body.date,
      tankNumber: req.body.tankNumber,
      sessionOne: req.body.sessionOne,
      sessionTwo: req.body.sessionTwo,
      sessionThree: req.body.sessionThree,
      sessionFour: req.body.sessionFour,
      sessionFive: req.body.sessionFive */
    });
    // save tank to database
    tank.save().then(createdTankDetails => {
      res.status(201).json({
        message: 'Tank detals created successfully!',
        tankId: createdTankDetails._id
      });
    });
});

// get all tank data
router.get('', (req, res, next) => {
  TankSchemaModel.find().then(documents => {
    res.status(200).json({
      message: 'Tank data fetched successfully',
      tanks: documents
    });
  });
});

// get tank data by date
router.get('/:date', (req, res, next) => {
  TankSchemaModel.find( { date: { $eq: req.params.date } } ).then(documents => {
    res.status(200).json({
      message: 'Tank details successfully fetched!',
      tanks: documents
    });
  });
});

// edit a tank
router.put('/:id', (req, res, next) => {
  console.log("Beans!");
  console.log(req.params.id);
  console.log(req.body);
  console.log(req.body.date);
  TankSchemaModel.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        // _id: req.body.id,
        date: req.body.date,
        tankNumber: req.body.tankNumber,
        sessionOne: req.body.sessionOne,
        sessionTwo: req.body.sessionTwo,
        sessionThree: req.body.sessionThree,
        sessionFour: req.body.sessionFour,
        sessionFive: req.body.sessionFive
      }
    }, (err, result) => {
      if(err) {
        console.log(err);
        res.status(401).json({
          message: 'Tank booking failed!'
        });
      } else {
        res.status(200).json({
          message: 'Tank booking updated successfully!'
        });
      }
    });
  });

// delete a single tank by id
router.delete('/:id', (req, res, next) => {
  TankSchemaModel.deleteOne( { _id: req.params.id } ).then(result => {
    res.status(200).json({ message: 'Tank successfully deleted'});
  });
});

module.exports = router;
