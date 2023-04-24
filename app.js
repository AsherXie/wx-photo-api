const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./router/index');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

Router(app);

app.use('/public', express.static(path.resolve(__dirname, './public/images')));

app.get('/', (_, res)=>{
  res.status(200).type('html').send('123123123123');
});

app.listen(3000, () => {
  console.log(999);
});
