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
                listProduct: allItem.listProduct,
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
                    listProduct: allItem.listProduct,
                    category: allItem.category,
                    gender: allItem.gender
                });
            }
            else {
                res.redirect('/login');
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
                res.redirect('/login');
            }
        };
        this.details = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                let navItem = await this.navBar(req, res);
                let allItem = await this.productService.findById(req.params.productId);
                res.render('product/details', {
                    listProduct: allItem.listProduct,
                    product: allItem.product,
                    category: navItem.category,
                    gender: navItem.gender
                });
            }
            else {
                res.redirect('/login');
            }
        };
        this.addToCart = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                await this.productService.saveProductToCart(+req.cookies.account_id, +req.params.productId, +req.body.quantity);
                res.redirect('/products');
            }
            else {
                res.redirect('/login');
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
                res.redirect('/login');
            }
        };
        this.genderCategory = async (req, res) => {
            res.redirect('/mycart');
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
                res.redirect('/login');
            }
        };
        this.payment = async (req, res) => {
            let isStatus = await this.isCheckCookie(+req.cookies.account_id);
            if (isStatus) {
                await this.productService.paymentDone(+req.cookies.account_id);
                res.redirect('/home');
            }
            else {
                res.redirect('/login');
            }
        };
        this.productService = new product_service_1.ProductService();
        this.loginService = new login_service_1.LoginService();
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
//# sourceMappingURL=product-controller.js.map