/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Bill = require('../../models/Bill');
const User = require('../../models/User');

// @route   POST /api/bills
// @desc    Create new bill
// @access  Private
router.post('/', [
  auth,
  [
    check('name', 'Name is required.')
      .not()
      .isEmpty(),
    check('amount', 'Bill amount is required.')
      .not()
      .isEmpty(),
    check('duedate', 'Due date is required.')
      .not()
      .isEmpty(),
  ],
],
async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return (res.status(400).json({ errors: errors.array() }));
  }

  try {
    const newBill = new Bill({
      name: req.body.name,
      amount: req.body.amount,
      duedate: req.body.duedate,
      required: req.body.required,
      user: req.user.id,
    });

    const bill = await newBill.save();

    res.json(bill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET /api/bills
// @desc    Get all bills
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET /api/bills/user/:userid
// @desc    Get bills by user
// @access  Private
router.get('/user/:userid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      console.log(`User doesn't exist`)
    }

    if (!user.id === req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    const bills = await Bill.find({ user });

    return res.json(bills);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found.' });
    }
    res.status(500).send('Server error.');
  }
})

// @route   GET /api/bills/:id
// @desc    Get bill by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill.user.toString() === req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

// @route   DELETE /api/bills/:id
// @desc    Delete bill by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill.user.toString() === req.user.id) {
      return res.status(401).json({ msg: 'User not authorized. '});
    }

    await bill.remove();

    res.json({ msg: 'Bill removed.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Bill not found.' });
    }
    res.status(500).send('Server error.');
  }
})

module.exports = router;
