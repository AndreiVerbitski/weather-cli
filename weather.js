#! /usr/bin/env node
import {getArgs} from "./helpers/args.js"
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {printError, printHelp, printSuccess, printWeather} from "./services/log-service.js";
import {FILE_DICTIONARY, getKeyValue, saveKeyValue} from "./services/storage-service.js";
import {checkCity, getWeather} from "./services/api-service.js";
import dedent from "dedent-js";

const getForcast = async (city) => {
    try {
        const weather = await getWeather(city)
        // if (weather.data.status !== 200) throw Error(JSON.stringify(weather.data))
        printWeather(weather, '')
    } catch (e) {
        if (e?.response?.status === 404) {
        printError('Неверно указан город')
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message)
        }
    }
}
const saveToken = async (token) => {
    if (!token.length) {
        printError('token not found')
        return
    }

    try {
        await saveKeyValue(FILE_DICTIONARY.token, token)
        printSuccess('token added')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('city not found')
        return
    }

    try {
        await saveKeyValue(FILE_DICTIONARY.city, city)
        printSuccess('city added')
    } catch (e) {
        printError(e.message)
        return
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)

    if (args.h) {
        // Вывод help
        printHelp()

    }

    if (args.t) {
        await saveToken(args.t)
    }

    if (args.s) {
        if (await checkCity(args.s)) {
            await saveCity(args.s)
            await getForcast(args.s)
        } else {
            printError(`Такого города ${args.s} не существует`)
        }

    }
}

await initCLI()