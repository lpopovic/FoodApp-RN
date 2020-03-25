import axios from '../axios'
import { RestUrl } from './url'
import { PlaceCathering, PlaceFavorite, MenuItemFavorite, MenuItemFavoriteSmallObject } from '../../model'

class FavoriteNetwork {

    static fetchPostFavoritePlace = (place) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.favoritePlace
            let formData = {
                place
            }
            try {
                const { data } = await axios.post(url, formData)
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

    static fetchDeleteFavoritePlace = (favoriteId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.deleteFavoritePlace(favoriteId)
            try {
                const { data } = await axios.delete(url)
                resolve(data)
                // alert("Obrisao")
            } catch (error) {
                // alert("Nije")
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchGetAllFavoritedPlaces = (getFullObjects) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.favoritePlace
            try {
                const { data } = await axios.get(url)
                getFullObjects ?
                resolve(PlaceCathering.createArrayPlacesCathering(data))
                :
                resolve(PlaceFavorite.createArrayPlacesFavorite(data))

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });



    static fetchPostFavoriteMenuItem = (menuItem) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.favoriteMenuItem
            let formData = {
                menuItem
            }
            try {
                const { data } = await axios.post(url, formData)
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


    static fetchDeleteFavoriteMenuItem = (favoriteId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.deleteFavoriteMenuItem(favoriteId)
            try {
                const { data } = await axios.delete(url)
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


    static fetchGetAllFavoritedMenuItems = (getFullObjects) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.favoriteMenuItem
            try {
                const { data } = await axios.get(url)
                getFullObjects ?
                resolve(MenuItemFavorite.createArrayMenuItemsFavorite(data))
                :
                resolve(MenuItemFavoriteSmallObject.createArrayMenuItemsFavoriteSmallObject(data))
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
export { FavoriteNetwork }