import {Router} from "express";
import loginController from "../controller/login-controller";

export const routerLogin = Router()
routerLogin.get('/login', loginController.showLogin)
routerLogin.get('/register', loginController.showRegister)
routerLogin.post('/login', loginController.login)
routerLogin.post('/register', loginController.register)
routerLogin.get('/logout', loginController.logout)
