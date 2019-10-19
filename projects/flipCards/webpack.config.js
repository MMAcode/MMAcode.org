const path = require('path');
 
module.exports = {
  entry: './src/js/bundle.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  }
};