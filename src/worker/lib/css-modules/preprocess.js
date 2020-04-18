const sass = require('node-sass');

module.exports = function preprocess(data) {
  return sass.renderSync({ data }).css;
};
