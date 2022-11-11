import {Router} from "express";
import {routerProduct} from "./router-product";
import {routerLogin} from "./router-login";

export const router = Router()
router.use('', routerProduct)
router.use('', routerLogin )