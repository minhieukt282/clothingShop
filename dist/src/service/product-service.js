"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const gender_1 = require("../model/gender");
const bill_1 = require("../model/bill");
const details_1 = require("../model/details");
class ProductService {
    constructor() {
        this.findAll = async () => {
            let date = new Date();
            let sevenDayAgo = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 7);
            let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let limitProducts = await this.productRepository.query(`select *
                                                                from products limit 12`);
            let products = await this.productRepository.find();
            let category = await this.categoryRepository.find();
            let gender = await this.genderRepository.find();
            let newArrived = await this.productRepository.query(`select *
                                                             from products as p
                                                             where p.time between '${sevenDayAgo}' and '${today}'
                                                             order by p.time desc limit 8`);
            let allItem = {
                listProduct: products,
                limitProduct: limitProducts,
                newArrived: newArrived,
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
            let products = await this.productRepository.query(`select p.product_id, p.product_name, p.image, p.quantity, p.price
                                                           from products as p
                                                                    join category c on p.category_id = c.category_id
                                                                    join gender g on p.gender_id = g.gender_id
                                                           where c.category_name = '${categoryName}'
                                                             and g.gender_name = '${genderName}'`);
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
                                                       order by b.time desc `);
            return myBills;
        };
        this.showBillDetails = async (accountId) => {
            let billDetails = await this.billRepository.query(`select b.time, p.product_name, d.quantity, p.price
                                                           from bill as b
                                                                    join details d on b.bill_id = d.bill_id
                                                                    join products p on d.product_id = p.product_id
                                                           where b.bill_id = ${accountId}
                                                             and b.status = 1`);
            return billDetails;
        };
        this.searchByName = async (value) => {
            let products = await this.productRepository.query(`select *
                                                           from products
                                                           where product_name like '%${value}%'`);
            return products;
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