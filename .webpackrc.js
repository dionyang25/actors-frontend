const proxyTarget = 'http://test.mobileapi.hupu.com/admin/test';

module.exports = {
    devServer: {
        proxy: {
            '/**': {
                target: proxyTarget,
                changeOrigin: true

            },
        },
    },
};