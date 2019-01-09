const express = require('express');

const Device = require('./../models/device');

const router = express.Router();

router.post('', (req, res, next) => {
  console.log('post called....');
  const device = new Device({
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate
  });
  device.save().then((result) => {
    console.log('id', result.id);
    console.log('_id', result._id);
    res.status(201).json({
      message: 'Device added successfully.',
      deviceId: result._id
    });
  });
});

router.put('/:id', (req, res, next) => {

  const device = new Device({
    _id: req.body.id,
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: 'Admin',
    createdDate: Date.now().toLocaleString()
  });

  Device.updateOne({
    _id: req.params.id
  }, device)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update successful.'});
  });

});

router.get('', (req, res, next) => {

  console.log('paging params', req.query.pagesize, req.query.page);

  const pageSize = +req.query.pagesize;// 用'+'轉整數
  const currentPage = +req.query.page;
  const deviceQuery = Device.find();
  let fetchedDevices;

  // TODO: Pagin Query
  if (pageSize && currentPage) {
    deviceQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  deviceQuery
  .then(result => {
    fetchedDevices = result;
    return Device.count();
  })
  .then(deviceCount => {
      // TODO: 使用map解決後端_id對應前端模型需要的id, map可作資料轉換(model --> view model)
      // 這邊在device service用rxjs - pipe處理
      res.status(200).json({
        message: 'Devices fetch successfully!',
        devices: fetchedDevices,
        maxDevices: deviceCount
      });
    });
});

router.get('/:id', (req, res, next) => {
  Device.findById(req.params.id)
    .then(device => {
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: 'Device not found.'});
      }
    })
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);

  Device.deleteOne({
      _id: req.params.id
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Device deleted.'
      });
    });


});

module.exports = router;
