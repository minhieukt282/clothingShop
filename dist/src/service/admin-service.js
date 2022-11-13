"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
const bill_1 = require("../model/bill");
const details_1 = require("../model/details");
class AdminService {
    constructor() {
        this.createProduct = async (newProduct) => {
            await this.productRepository.save(newProduct);
        };
        this.showBill = async (time1, time2) => {
            let bills = await this.billRepository.query(`select time, count (price) as quantity, sum (price) as total
                                                     from (select b.time, sum (p.price * d.quantity) as price
                                                         from bill as b
                                                         join details d on b.bill_id = d.bill_id
                                                         join products p on d.product_id = p.product_id
                                                         where b.time between '${time1}' and '${time2}'
                                                         group by b.bill_id) as temptable
                                                     group by time`);
            return bills;
        };
        this.showProduct = async (productId) => {
            let product = await this.productRepository.find({
                where: {
                    product_id: productId
                }
            });
            return product;
        };
        this.updateProduct = async (req) => {
            let newUpdate = {
                product_id: +req.params.productId,
                product_name: req.body.product_name,
                description: req.body.description,
                quantity: +req.body.quantity,
                price: +req.body.price,
                category_id: +req.body.category_id,
                gender_id: +req.body.gender_id
            };
            await this.productRepository.save(newUpdate);
        };
        this.updateImage = async (req, url) => {
            let newImage = {
                product_id: +req.params.productId,
                image: url
            };
            await this.productRepository.save(newImage);
        };
        this.delProduct = async (productId) => {
            await this.productRepository.delete(productId);
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            console.log("Admin service connect success");
            this.productRepository = connection.getRepository(product_1.Product);
            this.billRepository = connection.getRepository(bill_1.Bill);
            this.detailsRepository = connection.getRepository(details_1.Details);
        });
    }
}
exports.AdminService = AdminService;
exports.default = new AdminService();
//# sourceMappingURL=admin-service.js.map