import axios from "axios";
import {FILE_DICTIONARY, getKeyValue} from "./storage-service.js";

async function getWeather(city) {
    const token = await getKeyValue(FILE_DICTIONARY.token)
    if (!token) {
        throw new Error('token not found, add it through command -t [API_KEY]')
    }
    const url = `https://api.openweathermap.org/data/2.5/weather`
    let {data} = await axios.get(url, {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    })
    console.log(data)
}

export { getWeather }