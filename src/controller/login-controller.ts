import {LoginService} from "../service/login-service";
import {Request, Response} from "express";


export class LoginController {
    private loginService: LoginService

    constructor() {
        this.loginService = new LoginService()
    }

    showLogin = async (req: Request, res: Response) => {
        res.render('login/login')
    }

    showRegister = async (req: Request, res: Response) => {
        res.render('login/register')
    }

    login = async (req: Request, res: Response) => {
        // console.log(req.body)
        let status = await this.loginService.checkin(req.body.username, req.body.password)
        if (status.status) {
            if (status.isAdmin) {
                let accountId = await this.loginService.findAccountId(req.body.username)
                res.cookie('account_id', accountId[0].account_id, {maxAge: 2*60*60*1000, httpOnly: true})
                res.redirect('/admin')
            } else {
                let accountId = await this.loginService.findAccountId(req.body.username)
                res.cookie('account_id', accountId[0].account_id, {maxAge: 2*60*60*1000, httpOnly: true})
                res.redirect('/shops/home')
            }
        } else res.redirect('/users/login')
    }

    register = async (req: Request, res: Response) => {
        let isStatus = await this.loginService.checkUsername(req.body.username)
        if (isStatus) {
            res.redirect('/users/register')
        } else {
            if (req.body.password === req.body.confirmPassword) {
                await this.loginService.createAccount(req.body.username, req.body.password)
                res.redirect('/users/login')
            } else {
                res.redirect('/users/register')
            }
        }
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie("account_id");
        res.redirect('/users/login')
    }
}

export default new LoginController()