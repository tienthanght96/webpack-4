const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV === 'production';
const VENDOR_LIBS = [
  "axios",
  "react",
  "react-dom",
  "react-redux",
  "react-router",
  "react-router-dom",
  "redux",
];
module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: './src/index.js',
    vendors: VENDOR_LIBS
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].bundle.css' : '[name].[hash].bundle.css',
      chunkFilename: devMode ? '[id].bundle.css' : '[id].[hash].bundle.css',
    })
  ],
  output: {
    filename: devMode ? '[name].bundle.js' :  '[name].[hash].bundle.js' ,
    path: path.resolve(__dirname, "dist"),
    chunkFilename: devMode ? '[name].bundle.js' :  '[name].[hash].bundle.js' ,
    publicPath: '/' // dam bao chay chinh xac o port chi dinh vd localhost3000
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          enforce: true,
          priority: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};