// 配置具体的修改规则。按需引入
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = function override(config, env) {
    return config;
};
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            // 运行js修改less
            javascriptEnabled: true,
            // 修改变量
            modifyVars: { '@primary-color': 'orange' },
        }
    }),
);