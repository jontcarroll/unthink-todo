"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const config = require("../config/config");
require("reflect-metadata");
let MongoDbService = class MongoDbService {
    constructor() {
        this.client = new mongodb_1.MongoClient(config.mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    async getDb() {
        if (!this.db) {
            console.log('Creating mongo db service');
            await this.client.connect();
            this.db = this.client.db(config.mongoDbDefaultDatabase);
        }
        return this.db;
    }
};
MongoDbService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MongoDbService);
exports.MongoDbService = MongoDbService;
//# sourceMappingURL=mongodb-service.js.map