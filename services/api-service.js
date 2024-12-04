import axios from "axios";
import {FILE_DICTIONARY, getKeyValue} from "./storage-service.js";

async function getIcon(icon) {

}
async function getWeather() {
    const token = process.env.TOKEN ?? await getKeyValue(FILE_DICTIONARY.token)
    const city = await getKeyValue(FILE_DICTIONARY.city)
    if (!token) {
        throw new Error('token not found, add it through command -t [API_KEY]')
    }
    if (!city) {
        throw new Error('city not found, add it through command -s [CITY]')
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
    return data
}

async function checkCity(city) {
    const token = '4b2ae0877839d8ae99bf622a6405d2da'
    if (!token) {
        throw new Error('token not found, add it through command -t [API_KEY]')
    }
    if (!city) {
        throw new Error('city not found, add it through command -s [CITY]')
    }
    const url = `https://api.openweathermap.org/data/2.5/weather`
    try {
        let {data} = await axios.get(url, {
            params: {
                q: city,
                appid: token,
                lang: 'ru',
                units: 'metric'
            }
        })
        return true
    } catch (e) {
        return false
    }

}

export { getWeather, checkCity}