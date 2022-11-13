import { Request, Response } from "express";
export declare class AdminController {
    private adminService;
    private productService;
    private productController;
    constructor();
    showAdmin: (req: Request, res: Response) => Promise<void>;
    getRevenue: (req: Request, res: Response) => Promise<void>;
    showListProduct: (req: Request, res: Response) => Promise<void>;
    showCreate: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    showUpdate: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AdminController;
export default _default;
