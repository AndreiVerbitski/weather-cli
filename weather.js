#! /usr/bin/env node
import { getArgs } from "./helpers/args.js"
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {printHelp} from "./services/log-service.js";

const initCLI = () => {
    const args = getArgs(process.argv)

    const yargsArgv = yargs(hideBin(process.argv)).parse()
    // console.log(yargsArgv)
    // console.log(args)


    if (args.h) {
        // Вывод help
        printHelp()

    }

    if (args.s) {
        // Сохранение города
    }

    if (args.t) {
        // Сохранение токен
    }


}

initCLI()