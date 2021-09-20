const sass = require('sass');

module.exports = function preprocess(data) {
  return sass.renderSync({ data }).css;
};
