"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());
function getEnvironmentValue(name) {
    if (process.env[name]) {
        return process.env[name];
    }
    throw new Error(`Environment variable: ${name} is not set. If using .env please check your .env file`);
}
exports.mongoDbUrl = getEnvironmentValue('MONGO_DB_URL');
exports.mongoDbDefaultDatabase = getEnvironmentValue('MONGO_DB_DEFAULT_DB');
exports.expressServerPort = parseInt(getEnvironmentValue('EXPRESS_SERVER_PORT'));
exports.webpackDevServerPort = process.env.hasOwnProperty('WEBPACK_DEV_PORT') ? parseInt(process.env.WEBPACK_DEV_PORT) : null;
exports.isProduction = !!(process.env.hasOwnProperty('NODE_ENV') && process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production');
exports.nunjucksBaseTemplatePath = getEnvironmentValue('NUNJUCKS_TEMPLATE_BASE_PATH');
exports.nunjucksNotFoundTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_NOT_FOUND');
exports.nunjucksExpectedErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_ERROR');
exports.nunjucksFatalErrorTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_FATAL_ERROR');
exports.nunjucksUnauthorizedTemplate = getEnvironmentValue('NUNJUCKS_TEMPLATE_UNAUTHORIZED');
exports.contentBasePath = getEnvironmentValue('CONTENT_BASE_PATH');
exports.appName = packageJSON.name;
exports.appVersion = packageJSON.version;
//# sourceMappingURL=config.js.map