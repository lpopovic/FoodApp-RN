import axios from '../axios'
import { RestUrl } from './url'
import { Place, MenuItem } from '../../model'


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

    static fetchPlaceById = (placeId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getPlaceById(placeId)
            try {
                const { data } = await axios.get(url)
                const place = Place(data)

                resolve(place)
            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchMenuItems = (placeId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getMenuItemsTest(placeId)
            try {

                const { data } = await axios.get(url)
                const menuItems = MenuItem.createArrayMenuItems(data)

                resolve(menuItems)
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