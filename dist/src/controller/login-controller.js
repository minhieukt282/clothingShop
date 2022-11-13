"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../service/login-service");
class LoginController {
    constructor() {
        this.showLogin = async (req, res) => {
            res.render('login/login');
        };
        this.showRegister = async (req, res) => {
            res.render('login/register');
        };
        this.login = async (req, res) => {
            let status = await this.loginService.checkin(req.body.username, req.body.password);
            if (status.status) {
                if (status.isAdmin) {
                    let accountId = await this.loginService.findAccountId(req.body.username);
                    res.cookie('account_id', accountId[0].account_id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
                    res.redirect('/admin');
                }
                else {
                    let accountId = await this.loginService.findAccountId(req.body.username);
                    res.cookie('account_id', accountId[0].account_id, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
                    res.redirect('/shops/home');
                }
            }
            else
                res.redirect('/users/login');
        };
        this.register = async (req, res) => {
            let isStatus = await this.loginService.checkUsername(req.body.username);
            if (isStatus) {
                res.redirect('/users/register');
            }
            else {
                if (req.body.password === req.body.confirmPassword) {
                    await this.loginService.createAccount(req.body.username, req.body.password);
                    res.redirect('/users/login');
                }
                else {
                    res.redirect('/users/register');
                }
            }
        };
        this.logout = async (req, res) => {
            res.clearCookie("account_id");
            res.redirect('/users/login');
        };
        this.loginService = new login_service_1.LoginService();
    }
}
exports.LoginController = LoginController;
exports.default = new LoginController();
//# sourceMappingURL=login-controller.js.map