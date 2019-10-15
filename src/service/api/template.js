import axios from '../axios'
import { RestUrl } from './url'
class TemplateNetwork {
    static fetchTemplate = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.templateURL()
            try {
                const { data } = await axios.get(url)
                resolve(data)

            } catch (error) {
                if (error.response) {
                    reject(error.response.data)
                } else {
                    reject(error.message)
                }
            }
        });
}

export { TemplateNetwork }