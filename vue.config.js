const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.5.33:9998',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
