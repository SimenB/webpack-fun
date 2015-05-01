'use strict';

var express = require('express');

var app = express();

var router = express.Router();

router.get('/hello', function (req, res) {
  var name = req.query.name;

  res.send({ greeting: 'Hello, ' + name });
});

app.use('/hpp-webapp', router);

var server = app.listen(7021, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
