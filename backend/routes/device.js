const express = require('express');

const Device = require('./../models/device');

const router = express.Router();

router.post('', (req, res, next) => {
  const device = new Device({
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate
  });
  console.log('aaaaaaaa', device);
  res.status(201).json({message: 'Device added successfully.'});
});

router.get('', (req, res, next) => {
  const devices = [{
    id: '1111',
    name: '1111',
    macAddress: '1111',
    createdBy: 'Admin',
    createdDate: Date.now().toLocaleString()
  }, {
    id: '2222',
    name: '2222',
    macAddress: '2222',
    createdBy: 'Admin',
    createdDate: Date.now().toLocaleString()
  }];

  res.status(200).json({
      message: 'Devices fetch successfully!',
      devices: devices
  });
});













module.exports = router;
