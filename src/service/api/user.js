import axios from '../axios'
import { RestUrl } from './url'
import { User, CompanyRequest } from '../../model'
import {
    saveStorageData,
    STORAGE_KEY,
} from '../../helpers'
class UserNetwork {
    static fetchUserLogin = (usernameOrEmail, password) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.userLogin
            let formData = {
                usernameOrEmail,
                password,
            }

            try {

                const { data } = await axios.post(url, formData)
                resolve(data.token)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchUserRegister = (username, email, password, phoneNumber, name, lastName) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.userRegister
            let formData = {
                username,
                email,
                password,
                phoneNumber,
                name,
                lastName
            }

            try {

                const { data } = await axios.post(url, formData)
                resolve(data.success.message)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchUserInfo = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.userInfo
            try {
                const { data } = await axios.get(url)
                const user = new User(data)
                saveStorageData(data, STORAGE_KEY.USER_APP_DATA)
                resolve(user)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchUserPutNewAddress = (address) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.userPutNewAdress

            let formData = {
                address
            }
            try {
                const { data } = await axios.put(url, formData)
                resolve(data)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchUserGetCompanyReguests = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getCompanyReguest()

            try {
                const { data } = await axios.get(url)
                if ( data !== null) {
                    const companyRequest = new CompanyRequest(data)
                    if (companyRequest.status === null) {
                        resolve(companyRequest)
                    } else {
                        reject("Nema")
                    }
                }else {
                    reject("NEMA")
                }
              


            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchUserPutCompanyReguestsResponse = (idCompanyReguest, status) =>
        new Promise(async (resolve, reject) => {

            const url = RestUrl.getCompanyReguest(idCompanyReguest)
            let formData = {
                status
            }
            try {
                const { data } = await axios.put(url, formData)
                resolve(data)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

}

export { UserNetwork }