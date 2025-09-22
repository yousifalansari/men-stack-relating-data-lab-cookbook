const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Community index - list all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users: users });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show another user's pantry by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    res.render('users/show.ejs', { user: user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
