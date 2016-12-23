var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var address = 'localhost';


var server = new WebpackDevServer(webpack(config),
  {
    https: true,
    hot: true
  });

// Important part. Send down index.html for all requests
server.use('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(8080, address, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at '+ address);
});
