const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const deviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  macAddress: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdDate: {
    type: String,
    ref: "User",
    required: true
  }
});

deviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Device', deviceSchema);
