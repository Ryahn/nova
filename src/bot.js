const interactionCooldownsRL = new Map();
const interactionCooldownsRLPrevent = new Map();
const debugModeEnabled = true;
const cooldownTimeRL = 5000;
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { GatewayIntentBits, Partials, Client, REST, Routes, Events } = require('discord.js');
const logger = require('./utils/logger');
const config = require('./configs/bot');
const client = new Client({
    shards: getInfo().SHARD_LIST, //array of shards spawned
    shardCount: getInfo().TOTAL_SHARDS, 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});
client.cluster = new ClusterClient(client);
client.login(config.discord.token);
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
logger.info('Data found');

if (debugModeEnabled) {
    process.on('uncaughtException', (err) => {
        logger.error("Uncaught Exception", err.stack);
    });
    process.on('unhandledRejection', (reason) => {
        logger.error("Unhandled Rejection", reason);
    });
    process.on('exit', (code) => {
        logger.warn('Process exited with code', code);
    });
    client.rest.on('rateLimited', (data) => {
        logger.log("ERROR", "Client encountered a rate limit", data);
    });
}