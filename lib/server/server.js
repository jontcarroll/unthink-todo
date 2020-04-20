"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const di_container_1 = require("./config/di-container");
const express_register_resource_1 = require("express-register-resource");
const resource_decorator_1 = require("resource-decorator");
const version_resource_1 = require("./resources/version-resource");
const todo_resource_1 = require("./resources/todo-resource");
const nunjucks_resource_renderer_1 = require("nunjucks-resource-renderer");
const app = express();
app.use(cookieParser());
// Set up template rendering
const nunjucksResourceRenderer = new nunjucks_resource_renderer_1.NunjucksResourceRenderer(config.nunjucksBaseTemplatePath, {
    'APP_VERSION': config.appVersion,
    'IS_PRODUCTION': config.isProduction
}, config.nunjucksNotFoundTemplate, config.nunjucksExpectedErrorTemplate, config.nunjucksFatalErrorTemplate, config.nunjucksUnauthorizedTemplate);
resource_decorator_1.registerDefaultRenderer(resource_decorator_1.ResourceType.TEMPLATE, nunjucksResourceRenderer);
// Register resources here
express_register_resource_1.registerResource(app, version_resource_1.VersionResource, di_container_1.defaultContainer);
express_register_resource_1.registerResource(app, todo_resource_1.TodoResource, di_container_1.defaultContainer);
// For local development, the webpack dev server is used to serve up bundles
if (!config.isProduction) {
    /* eslint-disable */
    const { forwardToWebpackDevServer } = require('./webpack-proxy');
    /* eslint-enable */
    app.all('/public/js/*', forwardToWebpackDevServer);
    // In production, assets should be served via nginx
    app.use('/public/', express.static(path.join(process.cwd(), 'public')));
    // Enable HTTPS for local development
    https.createServer({
        key: fs.readFileSync('./certs/localhost.key'),
        cert: fs.readFileSync('./certs/localhost.crt'),
    }, app).listen(config.expressServerPort);
}
else {
    app.listen(config.expressServerPort);
}
//# sourceMappingURL=server.js.map