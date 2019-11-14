import axios from '../axios'
import { RestUrl } from './url'
import { Place } from '../../model'

class PlaceNetwork {

    static fetchTest = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.placeTest
            try {
                const { data } = await axios.get(url)
                const places = Place.createArrayPlaces(data)

                resolve(places)
            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchPlaces = (params) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getPlaces(params)
            try {
                const { data } = await axios.get(url)
                const places = Place.createArrayPlaces(data)

                resolve(places)
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

export { PlaceNetwork }