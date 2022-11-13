"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProduct = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product-controller"));
exports.routerProduct = (0, express_1.Router)();
exports.routerProduct.get('/', product_controller_1.default.showIndex);
exports.routerProduct.get('/home', product_controller_1.default.showHome);
exports.routerProduct.get('/products', product_controller_1.default.listProduct);
exports.routerProduct.get('/details/:productId', product_controller_1.default.details);
exports.routerProduct.post('/details/:productId', product_controller_1.default.addToCart);
exports.routerProduct.get('/category/:categoryName', product_controller_1.default.category);
exports.routerProduct.get('/:genderName/:categoryName', product_controller_1.default.genderCategory);
exports.routerProduct.get('/mycart', product_controller_1.default.myCart);
exports.routerProduct.post('/mycart', product_controller_1.default.payment);
exports.routerProduct.post('/delete/:productId', product_controller_1.default.deleteProduct);
exports.routerProduct.get('/history', product_controller_1.default.showHistory);
exports.routerProduct.post('/history', product_controller_1.default.getHistory);
exports.routerProduct.get('/history/bills/:billId', product_controller_1.default.getBillDetails);
exports.routerProduct.post('/search', product_controller_1.default.search);
//# sourceMappingURL=router-product.js.map