import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'other-to-text',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config,
  chainWebpack: (config) => {
    config.module
       .rule('mp4')
       .test(/\.(mp4|zip)(\?.*)?$/)
       .use('file-loader')
       .loader(require.resolve('file-loader'))
       .options({
         name: 'static/[name].[hash:8].[ext]',
         esModule: false,
       });
 }
});
