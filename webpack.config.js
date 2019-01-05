const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    "game": './src/index.tsx'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin(
      {
        title: 'Realm of Amplidi',
        filename: 'index.html',
        chunks: [
          'game'
        ]
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
