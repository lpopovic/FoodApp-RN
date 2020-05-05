import axios from '../axios'
import { RestUrl } from './url'
import { Category } from '../../model'
class CategoryNetwork {
    static fetchCategories = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getAllCategoriesByCity
            try {
                const { data } = await axios.get(url)
                const categories = Category.createArrayCategory(data)
                resolve(categories)

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

export { CategoryNetwork }