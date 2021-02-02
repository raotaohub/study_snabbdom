const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
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
