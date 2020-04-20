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
const resource_base_1 = require("./resource-base");
const resource_decorator_1 = require("resource-decorator");
const todo_schema_1 = require("../schemas/todo-schema");
const todo_model_1 = require("../models/todo-model");
const mongodb_1 = require("mongodb");
let TodoResource = class TodoResource extends resource_base_1.ResourceBase {
    async indexPage() {
        return new resource_decorator_1.TemplateResponse('todo.html');
    }
    async getTodos() {
        const db = await this.mongoDbService.getDb();
        const coll = db.collection('todos');
        const todos = await coll.find().toArray();
        if (!todos) {
            throw new resource_decorator_1.ResourceNotFound();
        }
        return new resource_decorator_1.ApiResponse(todos.map(t => {
            var _a;
            return new todo_model_1.TodoModel({
                id: (_a = t._id) === null || _a === void 0 ? void 0 : _a.toHexString(),
                title: t.title,
                complete: t.complete,
                dateCreated: t.dateCreated
            });
        }));
    }
    async postTodo(model) {
        const db = await this.mongoDbService.getDb();
        const coll = db.collection('todos');
        const schema = new todo_schema_1.TodoSchema({
            title: model.title,
            complete: model.complete,
            dateCreated: new Date()
        });
        const resp = await coll.insertOne(schema);
        if (!resp.result.ok) {
            throw new Error('Failed to insert todo item');
        }
        return new resource_decorator_1.ApiResponse({});
    }
    async putTodo(model) {
        const db = await this.mongoDbService.getDb();
        const coll = db.collection('todos');
        const record = await coll.findOne({ _id: new mongodb_1.ObjectID(model.id) });
        if (!record) {
            throw new resource_decorator_1.ResourceNotFound();
        }
        const updateResp = await coll.updateOne({ _id: new mongodb_1.ObjectID(model.id) }, { $set: {
                title: model.title,
                complete: model.complete
            }
        });
        if (!updateResp.result.ok) {
            throw new Error('Failed to update todo item');
        }
        return new resource_decorator_1.ApiResponse({});
    }
    async deleteTodo(id) {
        const db = await this.mongoDbService.getDb();
        const coll = db.collection('todos');
        const record = await coll.findOne({ _id: new mongodb_1.ObjectID(id) });
        if (!record) {
            throw new resource_decorator_1.ResourceNotFound();
        }
        const delResp = await coll.deleteOne({ _id: new mongodb_1.ObjectID(id) });
        if (!delResp.result.ok) {
            throw new Error('Failed to delete todo item!');
        }
        return new resource_decorator_1.ApiResponse({});
    }
};
__decorate([
    resource_decorator_1.template(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "indexPage", null);
__decorate([
    resource_decorator_1.get({
        path: '/api/todo'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "getTodos", null);
__decorate([
    resource_decorator_1.post({
        path: '/api/todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "postTodo", null);
__decorate([
    resource_decorator_1.put({
        path: '/api/todo'
    }),
    __param(0, resource_decorator_1.body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_model_1.TodoModel]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "putTodo", null);
__decorate([
    resource_decorator_1.del({
        path: '/api/todo/:id'
    }),
    __param(0, resource_decorator_1.path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResource.prototype, "deleteTodo", null);
TodoResource = __decorate([
    resource_decorator_1.resource({
        basePath: '',
    })
], TodoResource);
exports.TodoResource = TodoResource;
//# sourceMappingURL=todo-resource.js.map