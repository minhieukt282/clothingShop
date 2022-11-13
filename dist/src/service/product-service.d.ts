export declare class ProductService {
    private productRepository;
    private categoryRepository;
    private genderRepository;
    private billRepository;
    private detailsRepository;
    constructor();
    findAll: () => Promise<{
        listProduct: any;
        limitProduct: any;
        newArrived: any;
        category: any;
        gender: any;
    }>;
    findById: (id: number) => Promise<{
        listProduct: any;
        product: any;
    }>;
    findByCategory: (categoryName: string) => Promise<any>;
    findByGenderCategory: (genderName: string, categoryName: string) => Promise<any>;
    saveProductToCart: (accountId: number, productId: number, quantity: number) => Promise<void>;
    showMyCart: (accountId: number) => Promise<any[]>;
    showDetails: (accountId: number) => Promise<any[]>;
    removeProductFromCart: (accountId: number, productId: number) => Promise<void>;
    paymentDone: (accountId: number) => Promise<void>;
    showMyHistory: (accountId: number, time1: string, time2: string) => Promise<any>;
    showBillDetails: (accountId: number) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
