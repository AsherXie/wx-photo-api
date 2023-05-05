const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const connetion = require('../myqsql');
const bcrypt = require('bcrypt');
// 查询用户信息
Router.get('/user', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret_key', (error) => {
    if (!error) {
      res.status(200).sned({
        data: null,
        msg: 'Success',
      });
      return;
    }
    res.status(402).sned({
      data: null,
      msg: 'Fail',
    });
  });
});
// 登录
Router.post('/login', (req, res) => {
  try {
    connetion.query(
      'SELECT * FROM user_admin WHERE username = ?', [ req.body.username ], async (err, data) => {
        if (data && data.length) {
          const { password, username, is_not } = data[0];
          if(is_not) {
            res.status(402).send({
              data: null,
              msg: '账号已被封禁！',
            });
          }
          const pw = await bcrypt.compare(req.body.password, password);
          if (pw) {
            const token = jwt.sign(
              {
                password,
                username,
              },
              'secret_key',
              { expiresIn: '72h' }
            );
            res.status(200).send({
              data: token,
              msg: 'Success',
            });
          } else {
            res.status(402).send({
              data: null,
              msg: '请检查你的用户名密码！',
            });
          }
        } else {
          res.status(402).send({
            data: null,
            msg: '请检查你的用户名密码！',
          });
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }

  // res.send('11');
});
// 登出
Router.get('/logout', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    fs.appendFileSync(
      path.resolve(__dirname, './public/logout.txt'),
      `${token}\r\n`
    );
  }
  res.send('none');
});
// 注册
Router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  // const pwd =
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const sqlInsert = 'INSERT INTO user_admin (username, password) VALUES (?,?)';
  connetion.query(
    'SELECT * FROM user_admin WHERE username = ?',
    [ username ],
    (err, data) => {
      console.log(data);
      if (data && data.length) {
        res.status(400).send({
          error: 1,
          msg: '用户名已存在',
        });
        return;
      }
      connetion.query(sqlInsert, [ username, hash ], (err, data) => {
        console.log(err, data);
        if(!err) {
          res.status(200).send({
            error: 0,
            msg: 'success',
          });
        } else {
          res.status(400).send({
            error: 1,
            msg: err.message,
          });
        }
      });
    }
  );
});
module.exports = Router;
