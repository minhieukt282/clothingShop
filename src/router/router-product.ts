import {Router} from "express";
import productController from "../controller/product-controller";

export const routerProduct = Router()
routerProduct.get('/', productController.showIndex)
routerProduct.get('/home', productController.showHome)
routerProduct.get('/products', productController.listProduct)
routerProduct.get('/details/:productId', productController.details)
routerProduct.post('/details/:productId', productController.addToCart)
routerProduct.get('/category/:categoryName', productController.category)
routerProduct.get('/:genderName/:categoryName', productController.genderCategory)
routerProduct.get('/mycart', productController.myCart)
routerProduct.post('/mycart', productController.payment)
routerProduct.post('/delete/:productId', productController.deleteProduct)
routerProduct.get('/history', productController.showHistory)
routerProduct.post('/history', productController.getHistory)
routerProduct.get('/history/bills/:billId', productController.getBillDetails)
routerProduct.post('/search', productController.search)



