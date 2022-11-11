export declare class AdminService {
    private productRepository;
    private billRepository;
    private detailsRepository;
    constructor();
    createProduct: (newProduct: any) => Promise<void>;
    showBill: (time1: string, time2: string) => Promise<any>;
    showProduct: (productId: number) => Promise<any>;
    delProduct: (productId: number) => Promise<void>;
}
declare const _default: AdminService;
export default _default;
