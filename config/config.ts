const config = {
    development: {
      cdn: './',
      prefix: '/api',
      apiBaseUrl: 'http://47.101.164.110:9082' // 开发环境接口请求，后用于 proxy 代理配置
    },
    beta: {
      cdn: '//s.xxx.com/vite-react-app/beta', // 测试环境 cdn 路径
      prefix: '/api',
      apiBaseUrl: '//www.beta.xxx.com/v1' // 测试环境接口地址
    },
    release: {
      cdn: '//s.xxx.com/vite-react-app/release', // 正式环境 cdn 路径
      prefix: '/api',
      apiBaseUrl: '//www.xxx.com/v1' // 正式环境接口地址
    }
  }

  export default config;