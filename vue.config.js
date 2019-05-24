const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  lintOnSave: false,
  baseUrl: BASE_URL,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    config.optimization.clear('splitChunks').splitChunks({
      cacheGroups: {
        vue: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          priority: 0,
          chunks: 'initial'
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    proxy:  {
      
      // '/API': {
      //   target: 'http://192.168.21.233',   //代理接口
      //   changeOrigin: true,
      // },
      '': {
        target: 'http://localhost:4004',   //代理接口
        changeOrigin: true,
      }
    }
  }
  // devServer: {
  //   proxy: 'http://localhost:3004'
  // }
}
