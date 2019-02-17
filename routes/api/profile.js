const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// api/products/test
// public
router.get('/test',(req, res) =>res.json({msg: " Profile works"}));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'email'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});


router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      const {errors, isValid } = validateProfileInput(req.body);

      if(!isValid){
        return res.status(400).json(errors);
      }
      const profileFields = {};
      profileFields.user = req.user.id;
      if(req.body.handle) profileFields.handle = req.body.handle;
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
  
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }
      });
    }
  );

module.exports = router;