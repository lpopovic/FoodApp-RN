import axios from 'axios';


const fetch = axios.create({
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

fetch.defaults.headers.common['lat'] = "null";
fetch.defaults.headers.common['lng'] = "null";
fetch.defaults.headers.common['stateID'] = "null";
fetch.defaults.headers.common['cityID'] = "null";


export default fetch 