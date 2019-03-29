const express = require('express');
const checkAuth = require('./../middleware/check-auth');
const extractFile = require("../middleware/file");

const MeetingroomController = require('./../controllers/meetingroom');

const router = express.Router();

router.post('', checkAuth, extractFile, MeetingroomController.createMeetingroom);

router.put('/:id', checkAuth, extractFile, MeetingroomController.updateMeetingroom);

router.get('', checkAuth, MeetingroomController.getAllMeetingrooms);

router.get('/:id', MeetingroomController.getMeetingroomById);

module.exports = router;