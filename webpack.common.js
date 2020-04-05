'use strict';

const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {

  devtool: isDev ? 'inline-source-map' : 'source-map',

  mode: isDev ? 'development' : 'production',

  node: false,

  optimization: {
    minimize: true,
    noEmitOnErrors: true
  },

  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: isDev ? '"development"' : '"production"',
      RELEASE: `'${process.env.RELEASE || 'dev'}'`
    })
  ],

  resolve: {
    extensions: ['.js', '.json', '.scss', '.ts', '.tsx'],
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  }

};
