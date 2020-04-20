"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_decorator_1 = require("resource-decorator");
class ErrorModel extends resource_decorator_1.ResourceError {
    constructor(type, msg) {
        super(msg);
        this.type = type;
    }
}
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=error-model.js.map