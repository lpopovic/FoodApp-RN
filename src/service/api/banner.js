import axios from '../axios'
import { RestUrl, ParamsUrl } from './url'
import { Banner } from '../../model';
class BannerNetwork {
    static fetchHeroBanners = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.banners(ParamsUrl.hero)
            try {
                const { data } = await axios.get(url)
                const banners = Banner.createArrayTemplate(data)
                resolve(banners)

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

export { BannerNetwork }