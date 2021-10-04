'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const PWAManifestPlugin = require('webpack-pwa-manifest');

const common = require('./webpack.common.js');

const isDev = process.env.NODE_ENV === 'development';

module.exports = merge(common, {

  entry: {
    'act': path.resolve('src/public/js/act.ts'),
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
        exclude: /\/node_modules\//,
        sideEffects: true,
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
              implementation: require('sass'),
              sourceMap: isDev
            }
          }
        ]
      },
      {
        exclude: /\/node_modules\//,
        sideEffects: true,
        test: /\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[contenthash:8][ext]'
        }
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
            ],
            [
              'babel-plugin-minify-replace',
              {
                replacements: [
                  {
                    identifierName: 'ENVIRONMENT',
                    replacement: {
                      type: 'StringLiteral',
                      value: process.env.NODE_ENV,
                    }
                  },
                  {
                    identifierName: '__DOCUMENT__',
                    replacement: {
                      type: 'Identifier',
                      value: 'document'
                    }
                  }
                ]
              }
            ],
            'module:faster.js',
            'babel-plugin-transform-react-constant-elements'
            // 'babel-plugin-console-source'

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
          ],
          sourceMaps: isDev ? 'inline' : true
        },
        test: /\.tsx?$/
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        parallel: os.cpus().length,
        terserOptions: {
          ecma: 5,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          mangle: true,
          output: { comments: false },
          safari10: false
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          name: 'common',
          priority: 100,
          reuseExistingChunk: true,
          test: (module) => {
            return module.resource && (
              module.resource.includes('/node_modules/') ||
              module.resource.includes('/src/components/atoms/') ||
              module.resource.includes('/src/components/molecules/') ||
              module.resource.includes('/src/data/') ||
              module.resource.includes('/src/lib/')
            );
          }
        }
      }
    },
    usedExports: true
  },

  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name]-[contenthash:8].js',
    path: path.resolve('build/public'),
    publicPath: '/'
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/public',
          globOptions: {
            ignore: [ '.DS_Store', '*.scss', '*.ts', '*.woff2' ]
          }
        }
      ]
    }),
    new WebpackManifestPlugin({
      fileName: path.resolve('src/worker/data/assets.json'),
      filter: (file) => {
        return /\.css|js$/.test(file.path) && !/main-[0-9a-z]{4}\.js$/.test(file.path);
      }
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isDev ? 'css/[id].css' : 'css/[id]-[contenthash:8].css',
      filename: isDev ? 'css/[name].css' : 'css/[name]-[contenthash:8].css'
    }),
    new PWAManifestPlugin({
      background_color: '#fff',
      crossorigin: null,
      default_locale: 'en_NZ',
      description: 'MyGov.org.nz',
      display: 'standalone',
      filename: 'manifest.webmanifest',
      fingerprints: false,
      icons: [
        {
          purpose: 'any maskable',
          sizes: 48,
          src: path.resolve('src/public/images/icon-48.png'),
          type: 'image/png'
        },
        {
          purpose: 'any maskable',
          sizes: 192,
          src: path.resolve('src/public/images/icon-192.png'),
          type: 'image/png'
        },
        {
          purpose: 'any maskable',
          sizes: 512,
          src: path.resolve('src/public/images/icon-512.png'),
          type: 'image/png'
        }
      ],
      inject: false,
      name: 'MyGov New Zealand',
      offline_enabled: true,
      short_name: 'MyGov NZ',
      start_url: 'https://mygov.org.nz/tools?utm_source=homescreen',
      theme_color: '#f89828'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],

  target: 'web'

});
