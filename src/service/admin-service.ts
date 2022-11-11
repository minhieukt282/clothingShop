import {AppDataSource} from "../data-source";
import {Product} from "../model/product";

export class AdminService {
    private productRepository: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log("Admin service connect success")
            this.productRepository = connection.getRepository(Product)
        })
    }

    createProduct = async (newProduct: any) => {
        await this.productRepository.save(newProduct)
    }
}

export default new AdminService()