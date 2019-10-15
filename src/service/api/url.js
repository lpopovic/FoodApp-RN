
export const ROOT_URL = '';
const withKey = url => `${ROOT_URL}${url}`

class RestUrl {
    static templateURL = (test) => withKey(test)
}

export { RestUrl };