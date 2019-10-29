
const ROOT_URL = 'https://api.ketering.rtech.rs/api/';
const withKey = url => `${ROOT_URL}${url}`

class RestUrl {
    static templateURL = (test) => withKey(test)
    static getAllCities = withKey(`cities`)
}

export { RestUrl };