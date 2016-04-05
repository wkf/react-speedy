const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src', 'index'),
  build: path.join(__dirname, 'public'),
  exclude: /node_modules/
};

const common = {
  entry: PATHS.app,

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },

  output: {
    path: PATHS.build,
    filename: 'app.bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: PATHS.exclude
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!sass')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style/app.css', {allChunks: true}),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      React: 'react'
    })
  ]
};

const configs = {
  start: merge(common, {}),

  watch: merge(common, {
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || '8081'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          exclude: PATHS.exclude
        },
        {
          test: /\.scss$/,
          loader: 'style!css?importLoaders=1!sass'
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        React: 'react'
      })
    ]
  })
};

module.exports = configs[process.env.npm_lifecycle_event] || common;
