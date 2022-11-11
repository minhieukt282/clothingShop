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
        res.render('admin/adminHome', {})
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

        res.render('admin/create', {})
    }

    create = async (req: Request, res: Response) => {
        let file = req.files
        if (file) {
            let product = req.body;
            let image = file.image as UploadedFile;
            await image.mv('./public/storage/' + image.name);
            product.image = 'storage/' + image.name;
            await this.adminService.createProduct(product)
            res.redirect('/create');
        }
    }


}

export default new AdminController()