const path = require('path');

module.exports = {

  entry: './script/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'script')
  },

  watch: true,

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  }

};

// npx webpack --config webpack.config.js
