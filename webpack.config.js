const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

require('dotenv').config();

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: 'development',
  entry: ['whatwg-fetch', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
      PIC_URL: JSON.stringify(process.env.PIC_URL),
      TMDB_KEY: JSON.stringify(process.env.TMDB_KEY)
    })
  ]
};
