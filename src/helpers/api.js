import axios from '../service/axios'

export const updateHederLocationForAxios = (coordinate) => {
    axios.defaults.headers.common['stateID'] = String(coordinate.stateID);
    axios.defaults.headers.common['cityID'] = String(coordinate.cityID);
    axios.defaults.headers.common['lat'] = String(coordinate.latitude);
    axios.defaults.headers.common['lng'] = String(coordinate.longitude);
}
