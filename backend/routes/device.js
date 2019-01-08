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
  device.save();
  res.status(201).json({
    message: 'Device added successfully.'
  });
});

router.get('', (req, res, next) => {
  Device.find()
    .then(results => {
      
      // TODO: 使用map解決後端_id對應前端模型需要的id, map可作資料轉換(model --> view model)
      // 這邊在device service用rxjs - pipe處理
      res.status(200).json({
        message: 'Devices fetch successfully!',
        devices: results
      });
    });
});













module.exports = router;
