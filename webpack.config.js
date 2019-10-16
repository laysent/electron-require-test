const path = require('path');
const RequirePerformancePlugin = require('webpack-require-performance-plugin');

module.exports = function () {
  return {
    mode: 'development',
    entry: {
      filename: './src/index.js',
    },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new RequirePerformancePlugin(),
    ],
    optimization: {
      namedModules: true,
    },
    devtool: 'none'
  }
}