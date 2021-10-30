const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'http://localhost:7000',
            changeOrigin: true,
        })
    );
    app.use(
        '/association',
        createProxyMiddleware({
            target: 'http://localhost:7100',
            changeOrigin: true,
        })
    );
    app.use(
        '/bulletin',
        createProxyMiddleware({
            target: 'http://localhost:7200',
            changeOrigin: true,
        })
    );
};