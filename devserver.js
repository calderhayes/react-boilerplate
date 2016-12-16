/*eslint no-console:0 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var address = 'localhost';
// var open = require('open');

//new WebpackDevServer(webpack(config), config.devServer)
//.listen(config.port, 'localhost', function(err) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Listening at localhost:' + config.port);
//  //console.log('Opening your system browser...');
//  //open('http://localhost:' + config.port);
//});

new WebpackDevServer(webpack(config), { https: true, hot: true })
//.listen(config.port, config.devServer.listenHost, function (err) {
.listen(8080, address, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at '+ address);
    //console.log('Opening your system browser...');
    //open('http://localhost:' + config.port);
});
