import {AdminService} from "../service/admin-service";
import {Request, Response} from "express";
import {ProductService} from "../service/product-service";
import fileUpload, {UploadedFile} from "express-fileupload";
import {ProductController} from "./product-controller";

export class AdminController {
    private adminService: AdminService
    private productService: ProductService
    private productController: ProductController

    constructor() {
        this.adminService = new AdminService()
        this.productService = new ProductService()
        this.productController = new ProductController()
    }


    showAdmin = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let date = new Date()
            let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            let dataBills = await this.adminService.showBill(today, today)
            res.render('admin/adminHome', {
                listData: dataBills
            })
        } else {
            res.redirect('/users/login')
        }
    }

    getRevenue = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let dataBills = await this.adminService.showBill(req.body.time1, req.body.time2)
            res.render('admin/adminHome', {
                listData: dataBills
            })
        } else {
            res.redirect('/users/login')
        }
    }

    showListProduct = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let allItem = await this.productService.findAll()
            res.render('admin/product', {
                listProduct: allItem.listProduct,
                category: allItem.category,
                gender: allItem.gender
            })
        } else {
            res.redirect('/users/login')
        }
    }

    showCreate = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            res.render('admin/create')
        } else {
            res.redirect('/users/login')
        }
    }

    create = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let file = req.files
            if (file) {
                let newProduct = req.body;
                let image = file.image as UploadedFile;
                await image.mv('./public/storage/' + image.name);
                newProduct.image = '/storage/' + image.name;
                await this.adminService.createProduct(newProduct)
                res.redirect('/admin/create');
            }
        } else {
            res.redirect('/users/login')
        }
    }

    showUpdate = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let navItem = await this.productController.navBar(req, res)
            let allItem = await this.productService.findById(+req.params.productId)
            res.render('admin/update', {
                listProduct: allItem.listProduct,
                product: allItem.product,
                category: navItem.category,
                gender: navItem.gender
            })
        } else {
            res.redirect('/users/login')
        }
    }

    update = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            let file = req.files
            if (file) {
                let image = file.image as UploadedFile;
                await image.mv('./public/storage/' + image.name);
                await this.adminService.updateImage(req, `/storage/${image.name}`)
                res.redirect(`/admin/update/${req.params.productId}`)
            } else {
                await this.adminService.updateProduct(req)
                res.redirect(`/admin/update/${req.params.productId}`)
            }
        } else {
            res.redirect('/users/login')
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        let isStatus = await this.productController.isCheckCookie(+req.cookies.account_id)
        if (isStatus) {
            await this.adminService.delProduct(+req.params.productId)
            res.redirect('/admin/list')
        } else {
            res.redirect('/users/login')
        }
    }


}

export default new AdminController()