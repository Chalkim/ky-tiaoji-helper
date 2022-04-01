const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
//   devServer: {
//     proxy: {
//         '^/api': {
//             target: 'https://yz.chsi.com.cn',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/api': '/',
//             },
//             headers: {
//               referer: 'https://account.chsi.com.cn',
//               origin: 'https://account.chsi.com.cn',
//             }
//         }
//       }
//     },
  transpileDependencies: true,
});
