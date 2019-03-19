
const express = require('express');
const checkAuth = require('./../middleware/check-auth');

const DeviceController = require('./../controllers/device');

const router = express.Router();

router.post('', checkAuth, DeviceController.createDevice);

router.put('/:id', checkAuth, DeviceController.updateDevice);

router.get('', DeviceController.getAllDevices);

router.get('/:id', DeviceController.getDeviceById);

router.delete('/:id', checkAuth, DeviceController.deleteDevice);

module.exports = router;
