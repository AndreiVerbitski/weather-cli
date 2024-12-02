#! /usr/bin/env node
import {getArgs} from "./helpers/args.js"
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {printError, printHelp, printSuccess} from "./services/log-service.js";
import {FILE_DICTIONARY, getKeyValue, saveKeyValue} from "./services/storage-service.js";
import {getWeather} from "./services/api-service.js";

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

const initCLI = async () => {
    const args = getArgs(process.argv)

    if (args.h) {
        // Вывод help
        printHelp()

    }

    if (args.s) {
        await getWeather(args.s)
    }

    if (args.t) {
        await saveToken(args.t)
    }


}

await initCLI()