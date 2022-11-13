import {AppDataSource} from "../data-source";
import {Account} from "../model/account";

export class LoginService {
    private accountRepository: any

    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log('Login service connect success')
            this.accountRepository = connection.getRepository(Account)
        })
    }

    checkin = async (username: string, password: string) => {
        let status = {
            isAdmin: false,
            status: false
        }
        let gate = await this.accountRepository.find({
            where: {
                username: username,
                password: password
            }
        })
        if (gate.length !== 0) {
            if (gate[0].username === 'admin') {
                status = {
                    isAdmin: true,
                    status: true
                }
            } else {
                status = {
                    isAdmin: false,
                    status: true
                }
            }
        }
        return status
    }

    createAccount = async (username: string, password: string) => {
        let account = {
            username: username,
            password: password
        }
        await this.accountRepository.save(account)
    }

    checkUsername = async (username: string) => {
        let listUsername = await this.accountRepository.find({
            where: {
                username: username
            }
        })
        if (listUsername.length != 0) {
            return true
        } else return false
    }

    findAccountId = async (username: string) => {
        let account = await this.accountRepository.find({
            where: {
                username: username
            }
        })
        return account
    }

    findAllAccount = async () => {
        let account = await this.accountRepository.find()
        return account
    }
}

export default new LoginService()