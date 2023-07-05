const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const { combine, timestamp, label, printf, simple, splat } = format;
const consoleFormat = printf(({ level, message, type, label, timestamp }) => {
    var levelUpper = level.toUpperCase();
    switch (levelUpper) {
        case "INFO":
            message = chalk.cyan(message);
            level = chalk.cyanBright.bgBlack.bold(`${level.toUpperCase()}`);
            break;

        case "WARN":
            message = chalk.yellow(message);
            level = chalk.yellowBright.bgBlack.bold(`${level.toUpperCase()}`);
            break;

        case "ERROR":
            message = chalk.red(message);
            level = chalk.redBright.bgBlack.bold(`${level.toUpperCase()}`);
            break;

        default:
            break;
    }
    return `[${chalk.blueBright.bgBlack.bold(label)}] [${chalk.whiteBright.bgBlack(timestamp)}] [${level}] ${message}`;

});
const fileFormat = printf(({ level, message, label, timestamp }) => {
    return `[${label}] [${timestamp}] [${level}] ${message}`;
});
const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'NOVA' }),
        timestamp(),
        format.splat(),
        consoleFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/nova.log',
            format: combine(
                label({ label: 'NOVALOG' }),
                timestamp(),
                format.splat(),
                fileFormat
            )
        })
    ]
});

module.exports = logger;
