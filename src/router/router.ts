import {Router} from "express";
import {routerProduct} from "./router-product";
import {routerLogin} from "./router-login";
import {routerAdmin} from "./router-admin";

export const router = Router()
router.use('', routerProduct)
router.use('', routerLogin )
router.use('', routerAdmin)