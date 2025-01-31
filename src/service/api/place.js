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

    static fetchPlacesBySort = (params) =>
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
                const place = new Place(data)

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

    static fetchMenuItems = (placeId, dayOfWeek) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getMenuItems(placeId, dayOfWeek)
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

    static fetchMenuItemById = (itemId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getMenuItemById(itemId)
            try {

                const { data } = await axios.get(url)
                const menuItem = new MenuItem(data)

                resolve(menuItem)
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