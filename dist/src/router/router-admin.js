"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAdmin = void 0;
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controller/admin-controller"));
exports.routerAdmin = (0, express_1.Router)();
exports.routerAdmin.get('/', admin_controller_1.default.showAdmin);
exports.routerAdmin.post('/', admin_controller_1.default.getRevenue);
exports.routerAdmin.get('/list', admin_controller_1.default.showListProduct);
exports.routerAdmin.get('/create', admin_controller_1.default.showCreate);
exports.routerAdmin.post('/create', admin_controller_1.default.create);
exports.routerAdmin.get('/update/:productId', admin_controller_1.default.showUpdate);
exports.routerAdmin.post('/update/:productId', admin_controller_1.default.update);
exports.routerAdmin.post('/delete/:productId', admin_controller_1.default.deleteProduct);
//# sourceMappingURL=router-admin.js.map