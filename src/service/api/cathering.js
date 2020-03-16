import axios from '../axios'
import { RestUrl } from './url'
import { Order, PlaceCathering } from '../../model'


class CatheringNetwork {

    static fetchCatheringOrderFromDateToDate = (fromDate, toDate) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.catheringOrderFromDateToDate(fromDate, toDate)

            try {
                const { data } = await axios.get(url)
                resolve(Order.createArrayOrder(data))

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchCatheringOrderFromDateToDateByCompany = (fromDate, toDate, companyId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.catheringOrderFromDateToDateForCompany(fromDate, toDate, companyId)
            console.log("url",url)

            try {
                const { data } = await axios.get(url)
                resolve(Order.createArrayOrder(data))

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchPlacesCathering = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getPlacesForCathering

            try {
                const { data } = await axios.get(url)
                resolve(PlaceCathering.createArrayPlacesCathering(data))

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch {
                    reject(error.message)
                }
            }
        });




}
export { CatheringNetwork }