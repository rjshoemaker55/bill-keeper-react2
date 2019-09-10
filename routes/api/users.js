const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');


// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();

    if (req.user.id !== '5d65d6306c26af1aad0e821d') {
      return res.status(404).json({ msg: 'Access denied.' });
    }

    return res.json(users)
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error.');
  };
});


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required.')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email.')
    .isEmail(),
  check('password', 'Password must be at least 6 characters.')
    .isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists.'}]})
    }

    user = new User({
      name,
      email,
      password
    });

    // Encrypt passowrd
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
