import {homedir} from 'os'
import {join} from 'path'
import {promises} from 'fs'

const filePath = join(homedir(), 'weather-data.json')
const FILE_DICTIONARY = {
    token: 'token',
    city: 'city'
}
async function saveKeyValue(key, value) {
    let data = {}
    if (await isExist(filePath)) {
        const content = await promises.readFile(filePath, {encoding: "utf8"})
        data = JSON.parse(content)
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
}

async function getKeyValue(key) {
    if (await isExist(filePath)) {
        const content = await promises.readFile(filePath, {encoding: "utf8"})
        const data = JSON.parse(content)
        return data[key]
    }
    return 'key not found'
}

async function isExist(path) {
    try {
        await promises.stat(path)
        return true
    } catch (e) {
        return false
    }
}

export {saveKeyValue, getKeyValue, FILE_DICTIONARY}