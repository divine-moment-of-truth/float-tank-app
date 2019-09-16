const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TankSchemaModel = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new TankSchemaModel({
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        password: hash
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
  TankSchemaModel.findOne({
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
      { email: fetchedUser.email, userId: fetchedUser._id },
      'secret_this_should_be_longer',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed!'
    });
  });
});

module.exports = router
