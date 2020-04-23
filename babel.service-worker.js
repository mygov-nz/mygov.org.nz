const hashes = require('./src/worker/data/assets.json');

const assets = [
  '/',
  '/tools',
  '/tools/mmp-review/placeholder',
  '/tools/non-voters/placeholder'
].concat(Object.values(hashes));

module.exports = {

  plugins: [
    [
      'babel-plugin-minify-replace',
      {
        replacements: [
          {
            identifierName: '__VERSION__',
            replacement: {
              type: 'StringLiteral',
              value: Date.now().toString(36)
            }
          },
          {
            identifierName: '__ASSETS__',
            replacement: {
              type: 'StringLiteral',
              value: JSON.stringify(assets)
            }
          }
        ]
      }
    ]

  ],

  presets: [
    '@babel/preset-typescript',
    [
      'babel-preset-minify',
      {
        mangle: false
      }
    ]
  ]

};
