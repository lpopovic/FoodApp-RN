
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

    static placeTest = withKey(`places`)
    static getPlaces = (params) => {

        if( params){
            let param =''
            params.forEach(element => {
                param = `${param}${element}&` 
            });
            param = param.slice(0, -1);
            return withKey(`places?${param}`)
        }else {
            return withKey(`places`)
        }
       
    }

    static getAllcategories = withKey(`categories`)


}

class ParamsUrl {
    static search = (value) => { return `search=${value}` }
    static pickup = (value) => {return `pickup=${value}`}
    static delivery = (value) => {return `delivery=${value}`}
}

export { RestUrl, ParamsUrl, ROOT_URL_IMAGE };