/* tslint:disable no-console */
var webpack = require("webpack");
path = require("path");
//console.log("webpack relative root: ", path.join(__dirname, "/demo/"));
module.exports = {
  entry: ["./index.tsx"],
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.(tsx|ts)?$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.(tsx|ts)(\?.*$|$)/,
        loader: "ts-loader"
      },
      {
        test: /\.(jsx)(\?.*$|$)/,
        loader: "jsx-loader"
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
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }
    ]
  },
  resolve: {
     extensions: ["", ".js", ".jsx", ".tsx", ".ts"],
      alias: {
        styles: path.join(__dirname, "/src/styles/")
      }
  },
  plugins: [
    new webpack.DefinePlugin({
        "ENVIRONMENT": JSON.stringify(process.env.NODE_ENV || "LOCAL_DEV")
    })
  ]
};
