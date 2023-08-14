const atImport = require('postcss-import')
const cssNano = require('cssnano')

module.exports = {
  plugins: [
    atImport,
    cssNano
  ]
}