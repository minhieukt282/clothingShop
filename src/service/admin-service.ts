import {AppDataSource} from "../data-source";
import {Product} from "../model/product";
import {Bill} from "../model/bill";
import {Details} from "../model/details";
import {Between} from "typeorm";
import {Response, Request} from "express";

export class AdminService {
    private productRepository: any
    private billRepository: any
    private detailsRepository: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log("Admin service connect success")
            this.productRepository = connection.getRepository(Product)
            this.billRepository = connection.getRepository(Bill)
            this.detailsRepository = connection.getRepository(Details)
        })
    }

    createProduct = async (newProduct: any) => {
        await this.productRepository.save(newProduct)
    }

    showBill = async (time1: string, time2: string) => {
        let bills = await this.billRepository.query(`select time, count (price) as quantity, sum (price) as total
                                                     from (select b.time, sum (p.price * d.quantity) as price
                                                         from bill as b
                                                         join details d on b.bill_id = d.bill_id
                                                         join products p on d.product_id = p.product_id
                                                         where b.time between '${time1}' and '${time2}'
                                                         group by b.bill_id) as temptable
                                                     group by time`)
        return bills
    }

    updateProduct = async (req: Request) => {
        let newUpdate = {
            product_id: +req.params.productId,
            product_name: req.body.product_name,
            description: req.body.description,
            quantity: +req.body.quantity,
            price: +req.body.price,
            category_id: +req.body.category_id,
            gender_id: +req.body.gender_id
        }
        await this.productRepository.save(newUpdate)
    }

    updateImage = async (req: Request, url: string) => {
        let newImage = {
            product_id: +req.params.productId,
            image: url
        }
        await this.productRepository.save(newImage)
    }

    delProduct = async (productId: number) => {
        await this.productRepository.delete(productId)
    }

}

export default new AdminService()