import {AppDataSource} from "../data-source";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {Gender} from "../model/gender";
import {Bill} from "../model/bill";
import {Details} from "../model/details";
import {Between} from "typeorm";

export class ProductService {
    private productRepository: any
    private categoryRepository: any
    private genderRepository: any
    private billRepository: any
    private detailsRepository: any


    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log('Connect success')
            this.productRepository = connection.getRepository(Product)
            this.categoryRepository = connection.getRepository(Category)
            this.genderRepository = connection.getRepository(Gender)
            this.billRepository = connection.getRepository(Bill)
            this.detailsRepository = connection.getRepository(Details)
        })
    }

    findAll = async () => {
        let date = new Date()
        let sevenDayAgo = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 7)
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        let limitProducts = await this.productRepository.query(`select *
                                                                from products limit 12`)
        let products = await this.productRepository.find()
        let category = await this.categoryRepository.find()
        let gender = await this.genderRepository.find()
        let newArrived = await this.productRepository.query(`select *
                                                             from products as p
                                                             where p.time between '${sevenDayAgo}' and '${today}'
                                                             order by p.time desc limit 8`)
        let allItem = {
            listProduct: products,
            limitProduct: limitProducts,
            newArrived: newArrived,
            category: category,
            gender: gender
        }
        // console.log('all item', allItem)
        return allItem
    }

    findById = async (id: number) => {
        let product = await this.productRepository.findOneById(id);
        let products = await this.productRepository.find()
        let allItem = {
            listProduct: products,
            product: product
        }
        return allItem;
    }

    findByCategory = async (categoryName: string) => {
        let category = await this.categoryRepository.find({where: {category_name: categoryName}})
        let products = await this.productRepository.find({where: {category_id: category[0].category_id}})
        return products
    }

    findByGenderCategory = async (genderName: string, categoryName: string) => {
        let products = await this.productRepository.query(`select p.product_id, p.product_name, p.image, p.quantity, p.price
                                                           from products as p
                                                                    join category c on p.category_id = c.category_id
                                                                    join gender g on p.gender_id = g.gender_id
                                                           where c.category_name = '${categoryName}'
                                                             and g.gender_name = '${genderName}'`)
        return products
    }

    saveProductToCart = async (accountId: number, productId: number, quantity: number) => {
        let bills = await this.billRepository.find({
            where: {
                account_id: accountId,
                status: 'false'
            }
        })
        // console.log(bills)
        if (bills.length == 0) {
            let newBill = {
                account_id: accountId,
                time: new Date(),
                status: 'false'
            }
            await this.billRepository.save(newBill)
            bills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: 'false'
                }
            })
            bills.forEach(item => {
                if (item.status === false && item.account_id === accountId) {
                    let newProduct = {
                        bill_id: item.bill_id,
                        product_id: productId,
                        quantity: quantity
                    }
                    this.detailsRepository.save(newProduct)
                }
            })
        } else {
            bills.forEach(item => {
                if (item.status === false && item.account_id === accountId) {
                    let newProduct = {
                        bill_id: item.bill_id,
                        product_id: productId,
                        quantity: quantity
                    }
                    this.detailsRepository.save(newProduct)
                }
            })
        }
    }

    showMyCart = async (accountId: number) => {
        let details = await this.showDetails(accountId)
        // console.log(details)
        let myCart = []
        for (let i = 0; i < details.length; i++) {
            let product = await this.productRepository.find({
                where: {
                    product_id: details[i].product_id
                }
            })
            myCart.push(product[0])
        }
        // console.log(myCart)
        return myCart
    }

    showDetails = async (accountId: number) => {
        let bills = await this.billRepository.find({
            where: {
                account_id: accountId,
                status: false
            }
        })
        let details = []
        if (bills.length == 0) {
            return details
        } else {
            details = await this.detailsRepository.find({
                where: {
                    bill_id: bills[0].bill_id
                }
            })
            return details
        }
    }

    removeProductFromCart = async (accountId: number, productId: number) => {
        let bills = await this.billRepository.find({
            where: {
                account_id: accountId,
                status: 'false'
            }
        })
        let details = await this.detailsRepository.find({
            where: {
                bill_id: bills[0].bill_id,
                product_id: productId
            }
        })
        // console.log(details[0].product_id)
        await this.detailsRepository.delete(details)
    }

    paymentDone = async (accountId: number) => {
        let bills = await this.billRepository.find({
            where: {
                account_id: accountId,
                status: false
            }
        })
        await this.billRepository.save({
            bill_id: bills[0].bill_id,
            status: true
        })
    }

    showMyHistory = async (accountId: number, time1: string, time2: string) => {
        let myBills = await this.billRepository.query(`select b.time as time, b.bill_id as bill, SUM(p.price * d.quantity) as total
                                                       from bill as b
                                                           join details d
                                                       on b.bill_id = d.bill_id
                                                           join products p on d.product_id = p.product_id
                                                       where b.account_id = ${accountId}
                                                         and b.status = 1
                                                         and b.time between '${time1}'
                                                         and '${time2}'
                                                       group by b.bill_id
                                                       order by b.time desc `)
        return myBills
    }
    showBillDetails = async (accountId: number) => {
        let billDetails = await this.billRepository.query(`select b.time, p.product_name, d.quantity, p.price
                                                           from bill as b
                                                                    join details d on b.bill_id = d.bill_id
                                                                    join products p on d.product_id = p.product_id
                                                           where b.bill_id = ${accountId}
                                                             and b.status = 1`)
        return billDetails
    }
}

export default new ProductService()