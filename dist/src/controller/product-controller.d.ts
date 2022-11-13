import { Request, Response } from "express";
export declare class ProductController {
    private productService;
    private loginService;
    constructor();
    navBar: (req: Request, res: Response) => Promise<{
        listProduct: any;
        category: any;
        gender: any;
    }>;
    showIndex: (req: Request, res: Response) => Promise<void>;
    isCheckCookie: (cookie: number) => Promise<boolean>;
    showHome: (req: Request, res: Response) => Promise<void>;
    listProduct: (req: Request, res: Response) => Promise<void>;
    details: (req: Request, res: Response) => Promise<void>;
    addToCart: (req: Request, res: Response) => Promise<void>;
    category: (req: Request, res: Response) => Promise<void>;
    genderCategory: (req: Request, res: Response) => Promise<void>;
    myCart: (req: Request, res: Response) => Promise<void>;
    payment: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    showHistory: (req: Request, res: Response) => Promise<void>;
    getHistory: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
