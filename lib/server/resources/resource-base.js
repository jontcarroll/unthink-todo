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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const di_types_1 = require("../config/di-types");
const mongodb_service_1 = require("../services/mongodb-service");
const express_register_resource_1 = require("express-register-resource");
let ResourceBase = class ResourceBase {
    constructor(mongoDbService, log) {
        this.mongoDbService = mongoDbService;
        this.log = log;
    }
};
ResourceBase = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(di_types_1.TYPES.MongoDbService)),
    __param(1, inversify_1.inject(express_register_resource_1.TYPES.PinoLogger)),
    __metadata("design:paramtypes", [mongodb_service_1.MongoDbService, Object])
], ResourceBase);
exports.ResourceBase = ResourceBase;
//# sourceMappingURL=resource-base.js.map