var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
var address = 'localhost';
var port = 8080;


var server = new WebpackDevServer(webpack(config),
  {
    https: true,
    hot: true
  });

// Important part. Send down index.html for all requests
server.use('/', function(req, res) {

  switch(path.extname(req.originalUrl).toLowerCase()) {
    case '.map':
    case '.js':
    case '.css':
    case '.html':
      // Proceed as normal
      // FYI, this is not an exhaustive list
      break;
    default:
      // Render index.html, this is for the client side routing
      // necessary in an SPA
      res.sendFile(path.join(__dirname+'/index.html'));
  }

});

server.listen(port, address, function (err) {
    if (err) {
        console.log(err);
    }
    else {
      console.log('Listening at ' + address + ':' + port);
    }
});
