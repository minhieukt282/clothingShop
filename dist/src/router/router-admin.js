"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAdmin = void 0;
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controller/admin-controller"));
exports.routerAdmin = (0, express_1.Router)();
exports.routerAdmin.get('/admin', admin_controller_1.default.showAdmin);
exports.routerAdmin.get('/list', admin_controller_1.default.listProduct);
exports.routerAdmin.get('/create', admin_controller_1.default.showCreate);
exports.routerAdmin.post('/create', admin_controller_1.default.create);
//# sourceMappingURL=router-admin.js.map