'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const os = require('os');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

const isDev = common.mode === 'development';

module.exports = merge(common, {

  bail: true,

  cache: false,

  entry: path.resolve('src/worker/index.ts'),

  module: {
    rules: [
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
              'babel-plugin-css-modules-transform',
              {
                camelCase: true,
                devMode: isDev,
                extensions: [ '.module.scss', '.scss' ],
                generateScopedName: isDev
                  ? '[local]_[md5:hash:base62:4]'
                  : '_[md5:hash:base62:4]',
                preprocessCss: './src/worker/lib/css-modules/preprocess.js'
              }
            ],
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Preact.Fragment',
                throwIfNamespace: false
              }
            ],
            [
              'babel-plugin-minify-replace',
              {
                replacements: [
                  {
                    identifierName: "ENVIRONMENT",
                    replacement: {
                      type: "stringLiteral",
                      value: process.env.NODE_ENV,
                    }
                  },
                  {
                    identifierName: '__DOCUMENT__',
                    replacement: {
                      type: 'BooleanLiteral',
                      value: false
                    }
                  }
                ]
              }
            ],
            'module:faster.js',
            'babel-plugin-transform-react-constant-elements',
            'babel-plugin-console-source'
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
                  browsers: 'last 1 Chrome versions',
                },
                useBuiltIns: 'usage'
              }
            ]
          ],
          sourceMaps: isDev ? 'inline' : true
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
        sourceMap: isDev,
        terserOptions: {
          ecma: 10,
          ie8: false,
          output: { comments: false },
          safari10: false
        }
      })
    ]
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build/worker')
  },

  performance: {
    hints: false,
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/worker',
          globOptions: {
            ignore: ['.gitignore', 'assets.json', '*.ts']
          },
          transformPath(targetPath) {
            return targetPath.replace('_package', 'package');
          }
        }
      ]
    })
  ],

  resolve: {
    alias: {
      'history': path.resolve(__dirname, 'src/worker/lib/alias/history.ts'),
      'preact/hooks': path.resolve(__dirname, 'src/worker/lib/alias/preact-hooks.ts')
    }
  },

  target: 'webworker'

});
