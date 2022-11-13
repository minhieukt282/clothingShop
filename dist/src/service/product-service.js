"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const gender_1 = require("../model/gender");
const bill_1 = require("../model/bill");
const details_1 = require("../model/details");
const typeorm_1 = require("typeorm");
class ProductService {
    constructor() {
        this.findAll = async () => {
            let products = await this.productRepository.find();
            let category = await this.categoryRepository.find();
            let gender = await this.genderRepository.find();
            let allItem = {
                listProduct: products,
                category: category,
                gender: gender
            };
            return allItem;
        };
        this.findById = async (id) => {
            let product = await this.productRepository.findOneById(id);
            let products = await this.productRepository.find();
            let allItem = {
                listProduct: products,
                product: product
            };
            return allItem;
        };
        this.findByCategory = async (categoryName) => {
            let category = await this.categoryRepository.find({ where: { category_name: categoryName } });
            let products = await this.productRepository.find({ where: { category_id: category[0].category_id } });
            return products;
        };
        this.findByGenderCategory = async (genderName, categoryName) => {
            let category = await this.categoryRepository.find({ where: { category_name: categoryName } });
            let gender = await this.genderRepository.find({ where: { gender_name: genderName } });
            let products = await this.productRepository.find({
                where: {
                    category_id: category[0].category_id,
                    gender_id: gender[0].gender_id
                }
            });
            return products;
        };
        this.saveProductToCart = async (accountId, productId, quantity) => {
            let bills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: 'false'
                }
            });
            if (bills.length == 0) {
                let newBill = {
                    account_id: accountId,
                    time: new Date(),
                    status: 'false'
                };
                await this.billRepository.save(newBill);
                bills = await this.billRepository.find({
                    where: {
                        account_id: accountId,
                        status: 'false'
                    }
                });
                bills.forEach(item => {
                    if (item.status === false && item.account_id === accountId) {
                        let newProduct = {
                            bill_id: item.bill_id,
                            product_id: productId,
                            quantity: quantity
                        };
                        this.detailsRepository.save(newProduct);
                    }
                });
            }
            else {
                bills.forEach(item => {
                    if (item.status === false && item.account_id === accountId) {
                        let newProduct = {
                            bill_id: item.bill_id,
                            product_id: productId,
                            quantity: quantity
                        };
                        this.detailsRepository.save(newProduct);
                    }
                });
            }
        };
        this.showMyCart = async (accountId) => {
            let details = await this.showDetails(accountId);
            let myCart = [];
            for (let i = 0; i < details.length; i++) {
                let product = await this.productRepository.find({
                    where: {
                        product_id: details[i].product_id
                    }
                });
                myCart.push(product[0]);
            }
            return myCart;
        };
        this.showDetails = async (accountId) => {
            let bills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: false
                }
            });
            let details = [];
            if (bills.length == 0) {
                return details;
            }
            else {
                details = await this.detailsRepository.find({
                    where: {
                        bill_id: bills[0].bill_id
                    }
                });
                return details;
            }
        };
        this.removeProductFromCart = async (accountId, productId) => {
            let bills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: 'false'
                }
            });
            let details = await this.detailsRepository.find({
                where: {
                    bill_id: bills[0].bill_id,
                    product_id: productId
                }
            });
            await this.detailsRepository.delete(details);
        };
        this.paymentDone = async (accountId) => {
            let bills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: false
                }
            });
            await this.billRepository.save({
                bill_id: bills[0].bill_id,
                status: true
            });
        };
        this.showMyHistory = async (accountId, time1, time2) => {
            let myBills = await this.billRepository.find({
                where: {
                    account_id: accountId,
                    status: true,
                    time: (0, typeorm_1.Between)(time1, time2)
                }
            });
            console.log(myBills);
            let arrayDetails = [];
            for (let i = 0; i < myBills.length; i++) {
                let myDetails = await this.detailsRepository.find({
                    where: {
                        bill_id: myBills[i].bill_id
                    }
                });
                arrayDetails.push(myDetails);
            }
            console.log(arrayDetails);
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            console.log('Connect success');
            this.productRepository = connection.getRepository(product_1.Product);
            this.categoryRepository = connection.getRepository(category_1.Category);
            this.genderRepository = connection.getRepository(gender_1.Gender);
            this.billRepository = connection.getRepository(bill_1.Bill);
            this.detailsRepository = connection.getRepository(details_1.Details);
        });
    }
}
exports.ProductService = ProductService;
exports.default = new ProductService();
//# sourceMappingURL=product-service.js.map