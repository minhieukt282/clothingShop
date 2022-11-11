import {Router} from "express";
import {routerProduct} from "./router-product";
import {routerLogin} from "./router-login";
import {routerAdmin} from "./router-admin";

export const router = Router()
router.use('/shops', routerProduct)
router.use('/users', routerLogin )
router.use('/admin', routerAdmin)