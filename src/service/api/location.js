import axios from '../axios'
import { RestUrl } from './url'
import { City } from '../../model'
class LocationNetwork {
    static getAllCities = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getAllCities
            try {
                const { data } = await axios.get(url)
                const object = City.createArrayCity(data)
                resolve(object)
            } catch (error) {
                if (error.response.data) {
                    reject(error.response.data.error.message)
                } else {
                    reject(error.message)
                }
            }
        });
}

export { LocationNetwork }