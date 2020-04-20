"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const httpProxy = require('http-proxy');
const config_1 = require("./config/config");
const webpackProxy = httpProxy.createProxyServer({
    secure: false
});
function forwardToWebpackDevServer(req, res) {
    webpackProxy.web(req, res, {
        target: `https://localhost:${config_1.webpackDevServerPort}`
    });
}
exports.forwardToWebpackDevServer = forwardToWebpackDevServer;
//# sourceMappingURL=webpack-proxy.js.map