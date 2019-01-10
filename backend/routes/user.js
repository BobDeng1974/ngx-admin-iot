const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log('signup', req.body.fullName);
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash
      });
      
      user.save()
        .then(result => {
          res.status(200).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
});

router.post('/login', (req, res, next) => {
  let fetchedUser;

  User.findOne({
      email: req.body.email
    })
    .then(targetUser => {
      if (!targetUser) {
        return res.status(401).json({
          message: 'Auth Failed.'
        });
      }
      fetchedUser = targetUser;
      return bcrypt.compare(req.body.password, targetUser.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth Failed.'
        });
      }

      const token = jwt.sign({
        email: fetchedUser.email,
        fullName: fetchedUser.fullName,
        userId: fetchedUser._id
      }, 'secret_this_should_be_longer', {
        expiresIn: '1h'
      })

      res.status(200).json({
        data: token,
        userId: fetchedUser._id,
        fullName: fetchedUser.fullName,
        email: fetchedUser.email
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: err
      });
    });
});

router.post('/logout', (req, res, next) => {
  res.status(200).json({
    message: 'logout success.'
  });
});

module.exports = router;
