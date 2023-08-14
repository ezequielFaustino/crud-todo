const atImport = require('postcss-import')
const cssNano = require('cssnano')
const postCssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    atImport,
    postCssPresetEnv({stage: 2}),
    cssNano
  ]
}