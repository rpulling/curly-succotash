module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./App.js",
    html: "./index.html"
  },

  module: {
    loaders: [
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "loaders": ["react-hot", "babel-loader"]
      },
      {
        "test": /\.html$/,
        "loader": "file?name=[name].[ext]"
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/, loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/, loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }

    ]
  },

  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  }
}
