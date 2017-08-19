/* tslint:disable no-console */
var webpack = require('webpack');
var path = require('path');
var {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
  target: 'web',
  context: __dirname,
  devtool: debug ? 'inline-source-map' : false,
  entry: ["./src/index.ts"],
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)(\?.*$|$)/,
        loader: 'awesome-typescript-loader',
        query: {
          useWebpackText: true,
          module: "es2015",
          target: "es5",
          lib: ['es6', 'dom'],
          useForkChecker: true
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      styles: path.join(__dirname, '/src/styles/')
    },
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
        'ENVIRONMENT': JSON.stringify(process.env.NODE_ENV || 'development'),
        'LIVE': JSON.stringify(process.env.LIVE || 'true'),
        'WS_LIVE': JSON.stringify(process.env.WS_LIVE || 'true')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  node: {
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
