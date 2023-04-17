const multer = require("multer");
const path = require("path");
const connercton = require('../myqsql/index')
const Router = require("express").Router();
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, path.resolve(__dirname,'../public/images'))
    },
    filename(req,file,cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

Router.post('/active/upload', upload.single('file'), (req, res)=>{
    res.status(200).send({msg:'ok'});

    console.log(req.file.filename);

    const sql = "insert into wx_images (name, description, email) values (?,?,?)";

    connercton.query(sql, ['123','123','123123'], (err, data) => {
        // res.send('123213')
    });
})

Router.post('/active/list', (req,res)=>{
    const { file_id } = req.body;
    console.log(req)
    const sql = `SELECT * FROM wx_images WHERE id = ${file_id}`
    connercton.query(sql, (err, data) => {
        console.log(data)
        res.send({
            msg: '图片不存在'
        })
    })
})
module.exports = Router