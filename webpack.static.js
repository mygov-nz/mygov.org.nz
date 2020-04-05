'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const os = require('os');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

const isDev = common.mode === 'development';

module.exports = merge(common, {

  entry: {
    'main': path.resolve('src/public/js/main.ts'),
    'mmp-review': path.resolve('src/public/js/mmp-review.ts'),
    'non-voters': path.resolve('src/public/js/non-voters.ts')
  },

  externals: [
    { gtag: 'gtag' }
  ],

  module: {
    rules: [
      {
        exclude: [
          /\.module\.scss$/,
          /node_modules/
        ],
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sourceMap: isDev
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev
                  ? '[local]_[md5:hash:base62:4]'
                  : '_[md5:hash:base62:4]'
              },
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sourceMap: isDev
            }
          }
        ]
      },
      {
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
        options: {
          ignore: [
            /__mocks__/,
            /__tests__/,
            /node_modules/
          ],
          plugins: [
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Preact.Fragment',
                throwIfNamespace: false
              }
            ]
          ],
          presets: [
            [
              '@babel/preset-typescript',
              {
                jsxPragma: 'h'
              }
            ],
            [
              '@babel/preset-env',
              {
                bugfixes: true,
                corejs: 3,
                debug: false,
                exclude: [
                  /generator|runtime/,
                  /web\.dom/
                ],
                loose: true,
                modules: false,
                targets: {
                  browsers: '> 1%, not dead',
                },
                useBuiltIns: 'usage'
              }
            ]
          ]
        },
        test: /\.tsx?$/
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: os.cpus().length,
        sourceMap: false,
        terserOptions: {
          ecma: 5,
          ie8: false,
          output: { comments: false },
          safari10: false
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          priority: 100,
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        }
      },
      name: true
    },
    usedExports: true
  },

  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name]-[chunkhash:6].js',
    path: path.resolve('build/public'),
    publicPath: '/'
  },

  plugins: [
    new CopyPlugin([{
      from: 'src/public',
      ignore: [ '*.scss', '*.ts' ]
    }]),
    new ManifestPlugin({
      fileName: path.resolve('src/worker/assets.json')
    }),
    new MiniCssExtractPlugin({
      chunkFilename: 'css/[id]-[chunkhash:6].css',
      filename: 'css/[name]-[chunkhash:6].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true }
          }
        ]
      }
    })
  ],

  target: 'web'

});