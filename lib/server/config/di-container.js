"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const di_types_1 = require("./di-types");
const mongodb_service_1 = require("../services/mongodb-service");
require("reflect-metadata");
const defaultContainer = new inversify_1.Container();
exports.defaultContainer = defaultContainer;
// Bind all of services
defaultContainer.bind(di_types_1.TYPES.MongoDbService).to(mongodb_service_1.MongoDbService).inSingletonScope();
//# sourceMappingURL=di-container.js.map