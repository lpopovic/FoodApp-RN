import axios from '../axios'
import { RestUrl } from './url'
import { City } from '../../model'
class LocationNetwork {
    static fetchGetAllCities = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getAllCities
            try {
                const { data } = await axios.get(url)
                const object = City.createArrayCity(data)
                resolve(object)
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

export { LocationNetwork }