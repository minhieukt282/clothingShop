import { Request, Response } from "express";
export declare class AdminController {
    private adminService;
    private productService;
    constructor();
    showAdmin: (req: Request, res: Response) => Promise<void>;
    listProduct: (req: Request, res: Response) => Promise<void>;
    showCreate: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AdminController;
export default _default;
