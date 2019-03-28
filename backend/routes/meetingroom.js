const express = require('express');
const checkAuth = require('./../middleware/check-auth');
const extractFile = require("../middleware/file");

const MeetingroomController = require('./../controllers/meetingroom');

const router = express.Router();

router.post('', checkAuth, extractFile, MeetingroomController.createMeetingroom);

router.get('', checkAuth, MeetingroomController.getAllMeetingrooms);

module.exports = router;