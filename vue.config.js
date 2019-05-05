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
    proxy: {
      '/api':{
        target: 'http://localhost:4004',
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }

}
