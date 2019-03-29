const Meetingroom = require('./../models/meetingroom');

exports.createMeetingroom = (req, res, next) => {
  const url = req.protocol + "://" + req.get('host');
  const meetingroom = new Meetingroom({
    name: req.body.name,
    imagePath: url + "/images/" + req.file.filename,
    createdBy: req.userData.userId,
    createdDate: new Date().toLocaleString()
  });

  // console.log('Create Meeting room', meetingroom);

  meetingroom.save().then((result) => {
    res.status(201).json({
      message: 'Meetingroom added successfully',
      meetingroom: {
        ...result,
        id: result._id
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Creating a meetingroom failed.',
      err: err
    });
  });
};

exports.getAllMeetingrooms = (req, res, next) => {
  console.log('_start', req.query._start);
  console.log('_limit', req.query._limit);
  console.log('_page', req.query._page);
  // const pageSize = +req.query.pagesize; // 用'+'轉整數
  // const currentPage = +req.query.page;
  const pageSize = +req.query._limit; // 用'+'轉整數
  //const pageSize = 1; // 用'+'轉整數
  const currentPage = +req.query._page;
  const meetingroomQuery = Meetingroom.find();
  let fetchedMeetingrooms;

  // TODO: Pagin Query
  // if (pageSize && currentPage) {
  //   meetingroomQuery
  //     .skip(pageSize * (currentPage - 1))
  //     .limit(pageSize);
  // }
  if (pageSize && currentPage) {
    meetingroomQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  
  meetingroomQuery
    .then(result => {
        fetchedMeetingrooms = result;
        console.log('bk-----meetingroom count', fetchedMeetingrooms);
      return Meetingroom.count();
    })
    .then(meetingroomCount => {
      // TODO: 使用map解決後端_id對應前端模型需要的id, map可作資料轉換(model --> view model)
      // 這邊在device service用rxjs - pipe處理
      res.status(200).json({
        message: 'Meetingrooms fetch successfully!',
        meetingrooms: fetchedMeetingrooms,
        maxMeetingrooms: meetingroomCount
      });
    });
};

exports.getMeetingroomById = (req, res, next) => {
  console.log('Get By ID');
  Meetingroom.findById(req.params.id)
    .then(meetingroom => {
      if (meetingroom) {
        console.log(meetingroom);
        res.status(200).json(meetingroom);
      } else {
        res.status(404).json({
          message: 'Meetingroom not found.'
        });
      }
    })
};

exports.updateMeetingroom = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    console.log('fileeeeeeeeeeeeeeee');
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const meetingroom = new Meetingroom({
    _id: req.body.id,
    name: req.body.name,
    imagePath: imagePath,
    createdBy: req.userData.userId,
    createdDate: new Date().toLocaleString()
  });
  Meetingroom.updateOne({ _id: req.params.id, createdBy: req.userData.userId }, meetingroom)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error,
      });
    });
};