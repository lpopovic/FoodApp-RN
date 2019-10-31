import axios from '../axios'
import { RestUrl } from './url'
import { User } from '../../model'
import {
    saveStorageData,
    STORAGE_KEY,
} from '../../helpers'
class UserNetwork {
    static fetchUserLogin = (usernameOrEmail, password, ) =>
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

    static fetchUserRegister = (username, email, password) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.userRegister
            let formData = {
                username,
                email,
                password,
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
                saveStorageData(data,STORAGE_KEY.USER_APP_DATA)
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
}

export { UserNetwork }