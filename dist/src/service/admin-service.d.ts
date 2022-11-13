import { Request } from "express";
export declare class AdminService {
    private productRepository;
    private billRepository;
    private detailsRepository;
    constructor();
    createProduct: (newProduct: any) => Promise<void>;
    showBill: (time1: string, time2: string) => Promise<any>;
    updateProduct: (req: Request) => Promise<void>;
    updateImage: (req: Request, url: string) => Promise<void>;
    delProduct: (productId: number) => Promise<void>;
}
declare const _default: AdminService;
export default _default;
