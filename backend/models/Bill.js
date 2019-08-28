const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new mongoose.Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      duedate: {
        type: Number,
        required: true
      },
      automatic: {
        type: Boolean,
        default: false
      },
});

const Bill = mongoose.model('bill', BillSchema);

module.exports = Bill;
