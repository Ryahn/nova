const { readdir } = require('fs/promises');
const { join } = require('path');
const logger = require('../utils/logger');
module.exports = async (client) => {
    try {
        const files = await readdir(join(__dirname, './events'));

        for (const file of files) {
            logger.info(`[EVENT LOADING]: ✅ ${file}`);
            const event = require(join(__dirname, `./events/${file}`));
            let eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        }
    } catch (err) {
        logger.error(`Event Error: ${err}`);
    }
};