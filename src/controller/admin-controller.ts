import {AdminService} from "../service/admin-service";
import {Request, Response} from "express";
import {ProductService} from "../service/product-service";
import fileUpload, {UploadedFile} from "express-fileupload";

export class AdminController {
    private adminService: AdminService
    private productService: ProductService

    constructor() {
        this.adminService = new AdminService()
        this.productService = new ProductService()
    }


    showAdmin = async (req: Request, res: Response) => {
        let date = new Date()
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        let dataBills = await this.adminService.showBill(today, today)
        res.render('admin/adminHome', {
            listData: dataBills
        })
    }

    revenue = async (req: Request, res: Response) => {
        let dataBills = await this.adminService.showBill(req.body.time1, req.body.time2)
        res.render('admin/adminHome', {
            listData: dataBills
        })
    }

    listProduct = async (req: Request, res: Response) => {
        let allItem = await this.productService.findAll()
        res.render('admin/product', {
            listProduct: allItem.listProduct,
            category: allItem.category,
            gender: allItem.gender
        })
    }

    showCreate = async (req: Request, res: Response) => {
        res.render('admin/create')
    }

    create = async (req: Request, res: Response) => {
        let file = req.files
        if (file) {
            let newProduct = req.body;
            let image = file.image as UploadedFile;
            await image.mv('./public/storage/' + image.name);
            newProduct.image = '/storage/' + image.name;
            await this.adminService.createProduct(newProduct)
            res.redirect('/admin/create');
        }
    }

    showUpdate = async (req: Request, res: Response) => {
        // console.log(req.params)
        let product = await this.adminService.showProduct(+req.params.productId)
        console.log(product)
        res.render('admin/update', {
            product: product
        })
    }
    deleteProduct = async (req: Request, res: Response) => {
        await this.adminService.delProduct(+req.params.productId)
        res.redirect('/admin/list')
    }


}

export default new AdminController()