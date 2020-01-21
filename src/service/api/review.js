import axios from '../axios'
import { RestUrl } from './url'
import { Review } from '../../model';
class ReviewNetwork {
    static KEY_PARAM_SORT = {
        NEW: '',
        PRICE_TAG: 'priceTag',
        RATING: 'rating'
    }
    static fetchGetReviewsFromPlace = (placeId, param) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getAllReviewsForPlace(placeId, param)
            try {
                const { data } = await axios.get(url)
                const reviews = Review.createArrayReview(data)

                resolve(reviews)


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

    static fetchPostCreateReview = (textReview, avgRating, avgPriceTag, orderId, placeId) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.postReview

            const formData = {
                text: textReview,
                rating: avgRating,
                priceTag: avgPriceTag,
                order: orderId,
                place: placeId

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
}

export { ReviewNetwork }