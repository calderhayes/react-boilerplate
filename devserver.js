var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var address = 'localhost';
var port = 8080;


var server = new WebpackDevServer(webpack(config),
  {
    https: true,
    hot: true
  });

// Important part. Send down index.html for all requests
server.use('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(port, address, function (err) {
    if (err) {
        console.log(err);
    }
    else {
      console.log('Listening at ' + address + ':' + port);
    }
});
