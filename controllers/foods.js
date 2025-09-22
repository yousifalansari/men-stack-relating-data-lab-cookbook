const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

// INDEX route - show all pantry items for user
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    res.render('foods/index.ejs', { user: user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


// NEW route - form to add new pantry item
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.params.userId });
});

// CREATE route - add new pantry item
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// EDIT route - form to edit pantry item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { userId: user._id, food: food });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// UPDATE route - update pantry item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    const food = user.pantry.id(req.params.itemId);
    food.name = req.body.name;
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// DELETE route - delete pantry item
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
