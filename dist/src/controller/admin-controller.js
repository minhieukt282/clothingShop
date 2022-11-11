"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../service/admin-service");
const product_service_1 = require("../service/product-service");
class AdminController {
    constructor() {
        this.showAdmin = async (req, res) => {
            let date = new Date();
            let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let dataBills = await this.adminService.showBill(today, today);
            res.render('admin/adminHome', {
                listData: dataBills
            });
        };
        this.revenue = async (req, res) => {
            let dataBills = await this.adminService.showBill(req.body.time1, req.body.time2);
            res.render('admin/adminHome', {
                listData: dataBills
            });
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
            res.render('admin/create');
        };
        this.create = async (req, res) => {
            let file = req.files;
            if (file) {
                let newProduct = req.body;
                let image = file.image;
                await image.mv('./public/storage/' + image.name);
                newProduct.image = '/storage/' + image.name;
                await this.adminService.createProduct(newProduct);
                res.redirect('/admin/create');
            }
        };
        this.showUpdate = async (req, res) => {
            let product = await this.adminService.showProduct(+req.params.productId);
            console.log(product);
            res.render('admin/update', {
                product: product
            });
        };
        this.deleteProduct = async (req, res) => {
            await this.adminService.delProduct(+req.params.productId);
            res.redirect('/admin/list');
        };
        this.adminService = new admin_service_1.AdminService();
        this.productService = new product_service_1.ProductService();
    }
}
exports.AdminController = AdminController;
exports.default = new AdminController();
//# sourceMappingURL=admin-controller.js.map