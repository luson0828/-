import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    autoprefixer: {
      // 配置需要支持的浏览器版本
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'IE 10'
      ]
    }
  }
}