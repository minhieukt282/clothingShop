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
        let products = await this.productRepository.find()
        let category = await this.categoryRepository.find()
        let gender = await this.genderRepository.find()
        let allItem = {
            listProduct: products,
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
        let category = await this.categoryRepository.find({where: {category_name: categoryName}})
        // console.log("category", category[0].category_id)
        let gender = await this.genderRepository.find({where: {gender_name: genderName}})
        // console.log("gender", gender[0].gender_id)
        let products = await this.productRepository.find({
            where: {
                category_id: category[0].category_id,
                gender_id: gender[0].gender_id
            }
        })
        // console.log("product", products)
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
        let myBills = await this.billRepository.find({
            where: {
                account_id: accountId,
                status: true,
                time: Between(time1, time2)
            }
        })
        console.log(myBills)
        let arrayDetails = []
        for (let i = 0; i < myBills.length; i++) {
            let myDetails = await this.detailsRepository.find({
                where: {
                    bill_id: myBills[i].bill_id
                }
            })
            arrayDetails.push(myDetails)
        }
        console.log(arrayDetails)

    }
}

export default new ProductService()