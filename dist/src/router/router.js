"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router_product_1 = require("./router-product");
const router_login_1 = require("./router-login");
const router_admin_1 = require("./router-admin");
exports.router = (0, express_1.Router)();
exports.router.use('', router_product_1.routerProduct);
exports.router.use('', router_login_1.routerLogin);
exports.router.use('', router_admin_1.routerAdmin);
//# sourceMappingURL=router.js.map