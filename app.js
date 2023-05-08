const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const Router = require('./router/index');
// const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
Router(app);

app.get('/', (_, res)=>{
  res.status(200).type('html').send('123123123123');
});

// async function sendEmail () {
//   // 配置邮件服务器
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.163.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: '15626327092@163.com',
//       pass: 'REAZQBCEENYCLXYP',
//     },
//   });

//   // 发送邮件
//   let info = await transporter.sendMail({
//     from: '15626327092@163.com',
//     to: '1494468173@qq.com',
//     subject: '审核结果通知',
//     text: '您好，您提交的内容审核被驳回，您可以点击下面的链接，继续通过网页的形式重新提交，感谢您的参与！',
//     // html: '<a href="https://www.nfcmdx.top">参与活动</>',
//   });
// }

// sendEmail();

app.listen(9988, () => {
  console.log(999);
});
