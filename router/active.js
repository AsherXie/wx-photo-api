const multer = require('multer');
const path = require('path');
const connercton = require('../myqsql/index');
const Router = require('express').Router();
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve('/active-images'));
  },
  filename (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1048576 * 3,
    files: 1,
  },
  fileFilter (req, file, cb) {
    const fileTypeList = [ 'image/png', 'image/jpg', 'image/jpeg' ];
    if (fileTypeList.indexOf(file.mimetype) === -1) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
});
const uploadMiddle = upload.single('file');

Router.post('/active/upload', (req, res) => {
  uploadMiddle(req, res, (err, data)=>{
    if(err) {
      res.status(400).send({
        msg: err.message
      });
      return;
    }
    res.status(200).send({ msg: 'ok', url: `/public/${req.file.filename}` });
  });
});

Router.post('/active/add', (req, res) => {
  const { name, image_url, remark, listen } = req.body;
  const sql = 'INSERT INTO wx_photo (name,image_url,remark,listen) values (?,?,?,?)';
  connercton.query(sql, [ name, image_url, remark, listen ], (err, data) => {
    if(err){
      res.status(400).send({
        msg: '图片不存在',
      });
    } else {
      res.status(200).send({
        msg: 'success',
      });
    }
    // console.log(data);
  });
});

Router.put('/active/add', (req, res) => {
  const { id, is_pass } = req.body;
  if(!id) {
    res.status(400).send({
      error: 1,
      msg: '缺少id参数'
    });
    return;
  }
  if(!is_pass) {
    res.status(400).send({
      error: 1,
      msg: '缺少is_pass参数'
    });
    return;
  }
  const sql = `UPDATE wx_photo SET is_pass=${is_pass} WHERE id=${id}`;
  // const { file_id } = req.body;
  // const sql = 'SELECT * FROM wx_photo WHERE is_delete=0';
  connercton.query(sql, (err, data) => {
    if(err){
      res.status(400).send({
        error: 1,
        msg: err.message,
      });
    } else if(!data.affectedRows) {
      res.status(400).send({
        error: 1,
        msg: '修改失败',
      });
    } else {
      res.status(200).send({
        error: 0,
        msg: 'success'
      });
    }
    // console.log(data);
  });
});

Router.get('/active/list', (req, res)=>{
  const sql = 'SELECT * FROM wx_photo';
  connercton.query(sql, (err, data) => {
    res.send({
      data
    });
  });
});

module.exports = Router;
