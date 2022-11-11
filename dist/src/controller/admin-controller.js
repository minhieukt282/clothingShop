"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../service/admin-service");
const product_service_1 = require("../service/product-service");
const product_controller_1 = require("./product-controller");
class AdminController {
    constructor() {
        this.showAdmin = async (req, res) => {
            let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let date = new Date();
                let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                let dataBills = await this.adminService.showBill(today, today);
                res.render('admin/adminHome', {
                    listData: dataBills
                });
            }
            else {
                res.redirect('/login');
            }
        };
        this.getRevenue = async (req, res) => {
            let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let dataBills = await this.adminService.showBill(req.body.time1, req.body.time2);
                res.render('admin/adminHome', {
                    listData: dataBills
                });
            }
            else {
                res.redirect('/login');
            }
        };
        this.showListProduct = async (req, res) => {
            let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let allItem = await this.productService.findAll();
                res.render('admin/product', {
                    listProduct: allItem.listProduct,
                    category: allItem.category,
                    gender: allItem.gender
                });
            }
            else {
                res.redirect('/login');
            }
        };
        this.showCreate = async (req, res) => {
            let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                res.render('admin/create');
            }
            else {
                res.redirect('/login');
            }
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
            console.log("asdasdas");
        };
        this.deleteProduct = async (req, res) => {
            await this.adminService.delProduct(+req.params.productId);
            res.redirect('/admin/list');
        };
        this.adminService = new admin_service_1.AdminService();
        this.productService = new product_service_1.ProductService();
        this.productController = new product_controller_1.ProductController();
    }
}
exports.AdminController = AdminController;
exports.default = new AdminController();
//# sourceMappingURL=admin-controller.js.map