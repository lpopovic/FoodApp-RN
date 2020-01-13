import axios from '../axios'
import { RestUrl } from './url'
class ReviewNetwork {
    static fetchGetReviewsFromPlace = (placeId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.templateURL()
            try {
                const { data } = await axios.get(url)
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
    static fetchGetReviewsFromOrder = (orderId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.templateURL()
            try {
                const { data } = await axios.get(url)
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

    static fetchPostCreateReview = (formData) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.templateURL()
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
}

export { ReviewNetwork }