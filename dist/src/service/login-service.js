"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const data_source_1 = require("../data-source");
const account_1 = require("../model/account");
class LoginService {
    constructor() {
        this.checkin = async (username, password) => {
            let status = false;
            let gate = await this.accountRepository.find({
                where: {
                    username: username,
                    password: password
                }
            });
            if (gate.length !== 0) {
                status = true;
            }
            return status;
        };
        this.createAccount = async (username, password) => {
            let account = {
                username: username,
                password: password
            };
            await this.accountRepository.save(account);
        };
        this.checkUsername = async (username) => {
            let listUsername = await this.accountRepository.find({
                where: {
                    username: username
                }
            });
            if (listUsername.length != 0) {
                return true;
            }
            else
                return false;
        };
        this.findAccountId = async (username) => {
            let account = await this.accountRepository.find({
                where: {
                    username: username
                }
            });
            return account;
        };
        this.findAllAccount = async () => {
            let account = await this.accountRepository.find();
            return account;
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            console.log('Connect success');
            this.accountRepository = connection.getRepository(account_1.Account);
        });
    }
}
exports.LoginService = LoginService;
exports.default = new LoginService();
//# sourceMappingURL=login-service.js.map