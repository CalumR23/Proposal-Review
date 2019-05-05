const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDir = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'], // enables async-await in client code with bable-polyfill
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8000', // http proxy for redirecting apis to local server;
    },
  },
  plugins: [
    new CleanWebpackPlugin(), // removes all files in webpack's output.path
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
