import {Router} from "express";
import adminController from "../controller/admin-controller";

export const routerAdmin = Router()
routerAdmin.get('/admin', adminController.showAdmin)
routerAdmin.get('/list', adminController.listProduct)
routerAdmin.get('/create', adminController.showCreate)
routerAdmin.post('/create', adminController.create)