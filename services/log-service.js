import chalk from "chalk";
import dedent from "dedent-js";

function printError(error) {

    console.log(chalk.bgRed('ERROR') + ': ' + error)
}

function printSuccess(message) {
    console.log(chalk.bgGreen('Success') + ': ' + message)
}

function printHelp() {
    console.log(dedent(`${chalk.bgYellow('Help:')}
        Без параметров: вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t установка api key
        `))
}

export {printError, printHelp, printSuccess}