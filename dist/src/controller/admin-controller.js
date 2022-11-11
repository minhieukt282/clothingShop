"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../service/admin-service");
const product_service_1 = require("../service/product-service");
class AdminController {
    constructor() {
        this.showAdmin = async (req, res) => {
            res.render('admin/adminHome', {});
        };
        this.listProduct = async (req, res) => {
            let allItem = await this.productService.findAll();
            res.render('admin/product', {
                listProduct: allItem.listProduct,
                category: allItem.category,
                gender: allItem.gender
            });
        };
        this.showCreate = async (req, res) => {
            res.render('admin/create', {});
        };
        this.create = async (req, res) => {
            let file = req.files;
            if (file) {
                let product = req.body;
                let image = file.image;
                await image.mv('./public/storage/' + image.name);
                product.image = 'storage/' + image.name;
                await this.adminService.createProduct(product);
                res.redirect('/create');
            }
        };
        this.adminService = new admin_service_1.AdminService();
        this.productService = new product_service_1.ProductService();
    }
}
exports.AdminController = AdminController;
exports.default = new AdminController();
//# sourceMappingURL=admin-controller.js.map