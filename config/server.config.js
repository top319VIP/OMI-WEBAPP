module.exports = {
    // 本地接口调试代理配置
    proxy: {
        "/api": {
            target: 'https://carapptest.gtmc.com.cn/api',
            pathRewrite: { '^/api': '' },
            changeOrigin: true
        }
    }

}
