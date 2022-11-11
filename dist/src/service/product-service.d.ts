export declare class ProductService {
    private productRepository;
    private categoryRepository;
    private genderRepository;
    private billRepository;
    private detailsRepository;
    constructor();
    findAll: () => Promise<{
        listProduct: any;
        category: any;
        gender: any;
    }>;
    findById: (id: any) => Promise<{
        listProduct: any;
        product: any;
    }>;
    findByCategory: (categoryName: string) => Promise<any>;
    findByGenderCategory: (genderName: string, categoryName: string) => Promise<any>;
    saveProductToCart: (accountId: number, productId: number, quantity: number) => Promise<void>;
    showMyCart: (accountId: number) => Promise<any[]>;
    showDetails: (accountId: number) => Promise<any[]>;
    paymentDone: (accountId: number) => Promise<void>;
}
declare const _default: ProductService;
export default _default;
