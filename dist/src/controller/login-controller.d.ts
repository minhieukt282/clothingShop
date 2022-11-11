import { Request, Response } from "express";
export declare class LoginController {
    private loginService;
    constructor();
    showLogin: (req: Request, res: Response) => Promise<void>;
    showRegister: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
}
declare const _default: LoginController;
export default _default;
