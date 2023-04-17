const Router = require("express").Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const connetion = require("../myqsql");

Router.get("/api/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret_key", (error) => {
    if (!error) {
      res.status(200).sned({
        data: null,
        msg: "Success",
      });
      return;
    }
    res.status(402).sned({
      data: null,
      msg: "Fail",
    });
  });
});
Router.post("/api/login", (req, res) => {
  console.log(req)
  try {
    connetion.query(
      "SELECT * FROM wx_user WHERE NAME = ?",
      [req.body.username],
      (err, data) => {
        if (data && data.length) {
          // console.log(999);
          const { password, name: username } = data[0];
          // console.log(req.body.username, username, req.body.password, password);
          if (
            (req.body.username === username, req.body.password === password)
          ) {
            const token = jwt.sign(
              {
                password,
                username,
              },
              "secret_key",
              { expiresIn: "72h" }
            );
            res.status(200).send({
              data: token,
              msg: "Success",
            });
          } else {
            res.status(402).send({
              data: null,
              msg: "请检查你的用户名密码！",
            });
          }
        } else {
          res.status(402).send({
            data: null,
            msg: "请检查你的用户名密码！",
          });
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }

  // res.send('11');
});
Router.get("/api/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    fs.appendFileSync(
      path.resolve(__dirname, "./public/logout.txt"),
      `${token}\r\n`
    );
  }
  res.send("none");
});

module.exports = Router
