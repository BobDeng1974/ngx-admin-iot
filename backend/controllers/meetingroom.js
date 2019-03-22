const Meetingroom = require('./../models/meetingroom');

exports.createMeetingroom = (req, res, next) => {

  console.log(req.file);



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
  // console.log('paging params', req.query.pagesize, req.query.page);
  const pageSize = +req.query.pagesize; // 用'+'轉整數
  const currentPage = +req.query.page;
  const meetingroomQuery = Meetingroom.find();
  let fetchedMeetingrooms;

  // TODO: Pagin Query
  // if (pageSize && currentPage) {
  //   meetingroomQuery
  //     .skip(pageSize * (currentPage - 1))
  //     .limit(pageSize);
  // }

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