const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": "考研调剂助手",
      },
    },
  },
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
