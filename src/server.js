const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const config = require('./configs/bot');
const logger = require('./utils/logger');
const path = require('path');
try {
    logger.info(`Node Version: ${process.version}`)
} catch (error) {
    logger.error(`Startup ERROR: ${error}`)
}
if (!config.discord.token) {
    logger.error('No Token Found');
    return;
}
const manager = new ClusterManager(path.join(__dirname, './bot.js'), {
    totalShards: 'auto',
    totalClusters: 'auto',
    shardsPerClusters: 2,
    // totalClusters: 7,
    mode: 'process', // or worker
    token: config.discord.token,
});
manager.on('clusterCreate', (cluster) => logger.info(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    })
);