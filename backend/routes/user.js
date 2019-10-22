const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchemaModel = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new UserSchemaModel({
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        password: hash,
        bookings: [
          {
            tank: req.body.bookings[0].tank,
            date: req.body.bookings[0].date,
            notes: req.body.bookings[0].notes
          },
          {
            tank: req.body.bookings[1].tank,
            date: req.body.bookings[1].date,
            notes: req.body.bookings[1].notes
          },
          {
            tank: req.body.bookings[2].tank,
            date: req.body.bookings[2].date,
            notes: req.body.bookings[2].notes
          }
        ]
        // bookings: [
        //   {
        //     tank: '',
        //     date: '',
        //     notes: ''
        //   }
        // ]
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });

});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  UserSchemaModel.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed!'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed!'
      });
    }
    const token = jwt.sign(
      // { email: fetchedUser.email, userId: fetchedUser._id },
      {
        email: fetchedUser.email,
        userId: fetchedUser._id,
        address: fetchedUser.address,
        telephone: fetchedUser.telephone,
        bookings: fetchedUser.bookings
      },
      'secret_this_should_be_longer',
      { expiresIn: '1h' }
    );
    userDetails = new UserSchemaModel({
      userId: fetchedUser._id,
      email: fetchedUser.email,
      name: fetchedUser.name,
      address: fetchedUser.address,
      telephone: fetchedUser.telephone,
      bookings: fetchedUser.bookings
    })
    res.status(200).json({
      token: token,
      userDetails: userDetails,
      expiresIn: 3600
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed!'
    });
  });
});

module.exports = router
