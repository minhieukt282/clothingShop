"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
class AdminService {
    constructor() {
        this.createProduct = async (newProduct) => {
            await this.productRepository.save(newProduct);
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            console.log("Admin service connect success");
            this.productRepository = connection.getRepository(product_1.Product);
        });
    }
}
exports.AdminService = AdminService;
exports.default = new AdminService();
//# sourceMappingURL=admin-service.js.map