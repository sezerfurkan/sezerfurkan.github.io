const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? ''  // Changed from '/sezerfurkan.github.io/' to empty string
    : '/'
})
