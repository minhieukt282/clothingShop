"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product-service");
const login_service_1 = require("../service/login-service");
class ProductController {
    constructor() {
        this.navBar = async (req, res) => {
            let navItem = await this.productService.findAll();
            return navItem;
        };
        this.showIndex = async (req, res) => {
            let allItem = await this.productService.findAll();
            res.render('product/guess', {
                listProduct: allItem.limitProduct,
                newArrived: allItem.newArrived,
                category: allItem.category,
                gender: allItem.gender
            });
        };
        this.isCheckCookie = async (cookie) => {
            let isStatus = false;
            let account = await this.loginService.findAllAccount();
            for (let i = 0; i < account.length; i++) {
                if (account[i].account_id === cookie) {
                    isStatus = true;
                    break;
                }
            }
            return isStatus;
        };
        this.showHome = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let allItem = await this.productService.findAll();
                res.render('product/home', {
                    listProduct: allItem.limitProduct,
                    newArrived: allItem.newArrived,
                    category: allItem.category,
                    gender: allItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.listProduct = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let allItem = await this.productService.findAll();
                res.render('product/list', {
                    listProduct: allItem.listProduct,
                    category: allItem.category,
                    gender: allItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.details = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let allItem = await this.productService.findById(+req.params.productId);
                res.render('product/details', {
                    listProduct: allItem.listProduct,
                    product: allItem.product,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.addToCart = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                await this.productService.saveProductToCart(+req.cookies.account_id, +req.params.productId, +req.body.quantity);
                res.redirect('/shops/products');
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.category = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let products = await this.productService.findByCategory(req.params.categoryName);
                res.render('product/list', {
                    listProduct: products,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.genderCategory = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let products = '';
                let navItem = await this.navBar(req, res);
                if (req.params.genderName !== 'mail' && req.params.categoryName !== 'jqBootstrapValidation.min.js"') {
                    products = await this.productService.findByGenderCategory(req.params.genderName, req.params.categoryName);
                }
                res.render('product/list', {
                    listProduct: products,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.myCart = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let myCart = await this.productService.showMyCart(+req.cookies.account_id);
                let details = await this.productService.showDetails(+req.cookies.account_id);
                let total = 0;
                for (let i = 0; i < myCart.length; i++) {
                    total += myCart[i].price * details[i].quantity;
                }
                res.render('product/cart', {
                    listProduct: myCart,
                    details: details,
                    category: navItem.category,
                    gender: navItem.gender,
                    total: total
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.payment = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                await this.productService.paymentDone(+req.cookies.account_id);
                res.redirect('/shops/home');
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.deleteProduct = async (req, res) => {
            await this.productService.removeProductFromCart(+req.cookies.account_id, +req.params.productId);
            res.redirect('/shops/mycart');
        };
        this.showHistory = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let date = new Date();
                let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                let bills = await this.productService.showMyHistory(+req.cookies.account_id, today, today);
                res.render('product/history', {
                    bills: bills,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.getHistory = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let bills = await this.productService.showMyHistory(+req.cookies.account_id, req.body.time1, req.body.time2);
                res.render('product/history', {
                    bills: bills,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.getBillDetails = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let billDetails = await this.productService.showBillDetails(+req.params.billId);
                let total = 0;
                billDetails.forEach(item => {
                    total += item.quantity * item.price;
                });
                res.render('product/billDetails', {
                    bills: billDetails,
                    category: navItem.category,
                    gender: navItem.gender,
                    total: total
                });
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.search = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let admin = 1;
                if (+req.cookies.account_id === admin) {
                    let products = await this.productService.searchByName(req.body.searchValue);
                    res.render('admin/product', {
                        listProduct: products
                    });
                }
                else {
                    let allItem = await this.productService.findAll();
                    let products = await this.productService.searchByName(req.body.searchValue);
                    res.render('product/list', {
                        listProduct: products,
                        category: allItem.category,
                        gender: allItem.gender
                    });
                }
            }
            else {
                res.redirect('/users/login');
            }
        };
        this.productService = new product_service_1.ProductService();
        this.loginService = new login_service_1.LoginService();
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
//# sourceMappingURL=product-controller.js.map