const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index-自己写.js',
  output: {
    // 虚拟的打包路径
    publicPath: "/xuni/",
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    contentBase: 'app',
  }
};
