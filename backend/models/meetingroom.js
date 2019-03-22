const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const meetingroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdDate: {
        type: String,
        required: true
    }
});

meetingroomSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Meetingroom', meetingroomSchema);