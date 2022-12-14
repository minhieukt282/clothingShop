import {Router} from "express";
import adminController from "../controller/admin-controller";

export const routerAdmin = Router()
routerAdmin.get('/', adminController.showAdmin)
routerAdmin.post('/', adminController.getRevenue)
routerAdmin.get('/list', adminController.showListProduct)
routerAdmin.get('/create', adminController.showCreate)
routerAdmin.post('/create', adminController.create)
routerAdmin.get('/update/:productId', adminController.showUpdate)
routerAdmin.post('/update/:productId', adminController.update)
routerAdmin.post('/delete/:productId', adminController.deleteProduct)