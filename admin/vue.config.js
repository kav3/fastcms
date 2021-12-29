module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: 'http://localhost:3001/'
    }
};