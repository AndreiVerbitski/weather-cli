import chalk from "chalk";
import dedent from "dedent-js";

function printError(error) {

    console.log(chalk.bgRed('ERROR') + ': ' + error)
}

function printSuccess(message) {
    console.log(chalk.bgGreen('SUCCESS') + ': ' + message)
}

function printHelp() {
    console.log(dedent(`${chalk.bgYellow('HELP:')}
        Без параметров: вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t установка api key
        `))
}

function printWeather(weather, icon) {
    console.log(dedent(`${chalk.bgMagentaBright('WEATHER')}
        В городе ${weather.name} сегодня ${icon} ${weather.weather[0].description}
        Температура: ${weather.main.temp} чувствуется как ${weather.main.feels_like}
        Влажность: ${weather.main.humidity}
        Скорость ветра: ${weather.wind.speed} метра в секунду
        `))
}

export {printError, printHelp, printSuccess, printWeather}