export declare class LoginService {
    private accountRepository;
    constructor();
    checkin: (username: string, password: string) => Promise<{
        isAdmin: boolean;
        status: boolean;
    }>;
    createAccount: (username: string, password: string) => Promise<void>;
    checkUsername: (username: string) => Promise<boolean>;
    findAccountId: (username: string) => Promise<any>;
    findAllAccount: () => Promise<any>;
}
declare const _default: LoginService;
export default _default;
