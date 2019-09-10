const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const TankSchemaModel = require('./models/tank');

const app = express();

mongoose.connect('mongodb+srv://andy:x2GE4Ptnp2kXuuIp@cluster0-1sqh7.mongodb.net/tanks?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log(err + 'Connection failed!!');
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  // create a tank
  app.post('/api/tank', (req, res, next) => {
    const tank = new TankSchemaModel({
      date: '22-08-2019',
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
  app.get('/api/tanks', (req, res, next) => {
    TankSchemaModel.find().then(documents => {
      res.status(200).json({
        message: 'Tank data fetched successfully',
        tanks: documents
      });
    });
  });

  // get tank data by date
  app.get('/api/tanks/:date', (req, res, next) => {
    TankSchemaModel.find( { date: { $eq: req.params.date } } ).then(documents => {
      res.status(200).json({
        message: 'Tank details successfully fetched!',
        tanks: documents
      });
    });
  });

  // edit a tank
  app.put('/api/tank/:id', (req, res, next) => {
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

      /* .then(result => {
        console.log('Tank booking updated successfully!');
        res.status(200).json({
          message: 'Tank booking updated successfully!'
        });
      }); */

  // delete a single tank by id
  app.delete('/api/tank/:id', (req, res, next) => {
    TankSchemaModel.deleteOne( { _id: req.params.id } ).then(result => {
      res.status(200).json({ message: 'Tank successfully deleted'});
    });
  });



  /* const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://andy:x2GE4Ptnp2kXuuIp@cluster0-1sqh7.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true} );
  client.connect(err => {
    const collection = client.db("floattanks").collection("tanks");
    console.log('Connected to database');
    // perform actions on the collection object
    client.close();
  }); */

module.exports = app;

