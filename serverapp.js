var express = require('express');
var app = express();
var path = require('path');
var task = require('./server/routes/task');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/task', task);

  app.get('/*', function(req, res) {
  var file = req.params[0] || './views/index.html';
  res.sendFile(path.join(__dirname, './server/public', file))
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'))
});