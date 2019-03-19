const Device = require('./../models/device');


exports.createDevice = (req, res, next) => {
  console.log('post called....');
  const device = new Device({
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: req.userData.userId,
    createdDate: Date.now().toLocaleString()
  });

  device.save().then((result) => {
    console.log('id', result.id);
    console.log('_id', result._id);
    res.status(201).json({
      message: 'Device added successfully.',
      deviceId: result._id
    });
  });
};


exports.updateDevice = (req, res, next) => {

  const device = new Device({
    _id: req.body.id,
    name: req.body.name,
    macAddress: req.body.macAddress,
    createdBy: 'Admin',
    createdDate: Date.now().toLocaleString()
  });

  Device.updateOne({
      _id: req.params.id,
      createdBy: req.userData.userId
    }, device)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({
          message: 'Update successful.'
        });
      } else {
        res.status(401).json({
          message: 'Not Authorized.'
        });
      }
    });
};

exports.getAllDevices = (req, res, next) => {

  // console.log('paging params', req.query.pagesize, req.query.page);

  const pageSize = +req.query.pagesize; // 用'+'轉整數
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
};

exports.getDeviceById = (req, res, next) => {
  Device.findById(req.params.id)
    .then(device => {
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({
          message: 'Device not found.'
        });
      }
    })
};

exports.deleteDevice = (req, res, next) => {
  // console.log(req.params.id);

  Device.deleteOne({
      _id: req.params.id,
      createdBy: req.userData.userId
    })
    .then((result) => {
      console.log(result);

      if (result.n > 0) {
        res.status(200).json({
          message: 'Device deleted.'
        });
      } else {
        res.status(401).json({
          message: 'Not Authorized.'
        });
      }
    });
};
