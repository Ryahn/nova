const { ActivityType } = require('discord.js');
const logger = require('../../utils/logger');
logger.info('[LOGIN]: Trying to login with provided token, if this takes longer than 5 minutes it might be cause you provided a invaild token');
module.exports = async (client) => {
    const activityText = `servers | Cluster${client.cluster.id}`;
    logger.info(`[LOGIN]: Logged into token as ${client.user.tag}`);
    client.user.setActivity(activityText, { type: ActivityType.Listening });
};
