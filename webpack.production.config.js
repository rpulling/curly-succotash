var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    },
    {
      test: /\.html$/,
      exclude: [node_modules_dir],
      loader: "file?name=[name].[ext]"
    },
    {
      test: /\.css$/,
      exclude: [node_modules_dir],
      loader: "style-loader!css-loader"
    },
    {
      test: /\.png$/,
      exclude: [node_modules_dir],
      loader: "url-loader?limit=100000"
    },
    {
      test: /\.jpg$/,
      exclude: [node_modules_dir],
      loader: "file-loader"
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      exclude: [node_modules_dir],
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      exclude: [node_modules_dir],
      loader: "file-loader"
    }]
  }
};

module.exports = config;
