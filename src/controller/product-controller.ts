import {ProductService} from "../service/product-service";
import {Request, Response} from "express";
import {LoginService} from "../service/login-service";

export class ProductController {
    private productService: ProductService
    private loginService: LoginService

    constructor() {
        this.productService = new ProductService()
        this.loginService = new LoginService()
    }

    navBar = async (req: Request, res: Response) => {
        let navItem = await this.productService.findAll()
        return navItem
    }

    showIndex = async (req: Request, res: Response) => {
        let allItem = await this.productService.findAll()
        res.render('product/guess', {
            listProduct: allItem.listProduct,
            category: allItem.category,
            gender: allItem.gender
        })
    }

    isCheckCookie = async (cookie: number) => {
        let isStatus = false
        let account = await this.loginService.findAllAccount()
        for (let i = 0; i < account.length; i++) {
            if (account[i].account_id === cookie) {
                isStatus = true
                break
            }
        }
        return isStatus
    }

    showHome = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let allItem = await this.productService.findAll()
            res.render('product/home', {
                listProduct: allItem.listProduct,
                category: allItem.category,
                gender: allItem.gender
            })
        } else {
            res.redirect('/login')
        }
    }

    listProduct = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let allItem = await this.productService.findAll()
            res.render('product/list', {
                listProduct: allItem.listProduct,
                category: allItem.category,
                gender: allItem.gender
            })
        } else {
            res.redirect('/login')
        }
    }

    details = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let navItem = await this.navBar(req, res)
            let allItem = await this.productService.findById(req.params.productId)
            res.render('product/details', {
                listProduct: allItem.listProduct,
                product: allItem.product,
                category: navItem.category,
                gender: navItem.gender
            })
        } else {
            res.redirect('/login')
        }

    }

    addToCart = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            await this.productService.saveProductToCart(+req.cookies.account_id, +req.params.productId, +req.body.quantity)
            res.redirect('/products')
        } else {
            res.redirect('/login')
        }
    }

    category = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let navItem = await this.navBar(req, res)
            let products = await this.productService.findByCategory(req.params.categoryName)
            res.render('product/list', {
                listProduct: products,
                category: navItem.category,
                gender: navItem.gender
            })
        } else {
            res.redirect('/login')
        }
    }

    genderCategory = async (req: Request, res: Response) => {
        // let products = ''
        // let navItem = await this.navBar(req, res)
        // // console.log(req.params.genderName, req.params.categoryName)
        // if (req.params.genderName !== 'mail' && req.params.categoryName !== 'jqBootstrapValidation.min.js"') {
        //     products = await this.productService.findByGenderCategory(req.params.genderName, req.params.categoryName)
        // }
        // console.log('products',products)
        res.redirect('/mycart')
    }

    myCart = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let navItem = await this.navBar(req, res)
            let myCart = await this.productService.showMyCart(+req.cookies.account_id)
            let details = await this.productService.showDetails(+req.cookies.account_id)
            let total = 0
            for (let i = 0; i < myCart.length; i++) {
                total += myCart[i].price * details[i].quantity
            }
            res.render('product/cart', {
                listProduct: myCart,
                details: details,
                category: navItem.category,
                gender: navItem.gender,
                total: total
            })
        } else {
            res.redirect('/login')
        }
    }

    payment = async (req: Request, res: Response) => {
        let isStatus = await this.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            await this.productService.paymentDone(+req.cookies.account_id)
            res.redirect('/home')
        } else {
            res.redirect('/login')
        }
    }
}

export default new ProductController()