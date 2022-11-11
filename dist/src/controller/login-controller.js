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
            if (status) {
                let accountId = await this.loginService.findAccountId(req.body.username);
                res.cookie('account_id', accountId[0].account_id, { maxAge: 86400, httpOnly: true });
                res.redirect('/home');
            }
            else
                res.redirect('/login');
        };
        this.register = async (req, res) => {
            let isStatus = await this.loginService.checkUsername(req.body.username);
            if (isStatus) {
                res.redirect('/register');
            }
            else {
                if (req.body.password === req.body.confirmPassword) {
                    await this.loginService.createAccount(req.body.username, req.body.password);
                    res.redirect('/login');
                }
                else {
                    res.redirect('/register');
                }
            }
        };
        this.logout = async (req, res) => {
            res.clearCookie("account_id");
            res.redirect('/login');
        };
        this.loginService = new login_service_1.LoginService();
    }
}
exports.LoginController = LoginController;
exports.default = new LoginController();
//# sourceMappingURL=login-controller.js.map