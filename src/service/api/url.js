
const ROOT_URL = 'https://api.ketering.rtech.rs';
const ROOT_URL_API = `${ROOT_URL}/api/`
const withKey = url => `${ROOT_URL_API}${url}`

const ROOT_URL_IMAGE = ROOT_URL
class RestUrl {
    static templateURL = (test) => withKey(test)
    static getAllCities = withKey(`cities`)

    static userLogin = withKey(`auth/login`)
    static userRegister = withKey(`auth/register`)
    static userInfo = withKey(`auth/me`)
    static userPutNewAdress = withKey(`users/pushaddress`)

    static placeTest = withKey(`places`)
    static getPlaces = (params) => {

        if (params) {
            let param = ''
            params.forEach(element => {
                param = `${param}${element}&`
            });
            param = param.slice(0, -1);
            return withKey(`places?${param}`)
        } else {
            return withKey(`places`)
        }
    }

    static getPlaceById = (placeId) => {
        return withKey(`places/${placeId}`)
    }
    static getMenuItems = (placeId, dayOfWeek) => {
        return withKey(`menuitems?isParent=true&place=${placeId}&${ParamsUrl.daysAvailable(dayOfWeek)}`)
    }
    static getMenuItemById = (menuItemId) => {
        return withKey(`menuitems/${menuItemId}`)
    }

    static order = withKey(`orders`)

    static getAllcategories = withKey(`categories`)

    static getCompanyReguest = (id) => {
        return withKey(`companyrequests${id ? `/${id}` : ''}`)
    }

    static getAllReviewsForPlace = (placeId) => {
        return withKey(`reviews/${placeId}`)
    }

    static getReviewForOrder = (orderId) => {
        return withKey(`reviews/order/${orderId}`)
    }

    static postReview = withKey(`reviews`)

}

class ParamsUrl {
    static search = (value) => { return `search=${value}` }
    static pickup = (value) => { return `pickup=${value}` }
    static delivery = (value) => { return `delivery=${value}` }
    static category = (value) => { return `category=${value}` }
    static avgRating = (value) => { return `avgRating=${value}` }
    static avgPriceTag = (value) => { return `avgPriceTag=${value}` }
    static daysAvailable = (value) => { return `daysAvailable=${value}` }
    static scheduledTime = (value) => { return `scheduledTime=${value}` }
    static isCatheringOrder = (value) => { return `isCatheringOrder=${value}` }

}

export { RestUrl, ParamsUrl, ROOT_URL_IMAGE };