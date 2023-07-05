require('dotenv').config();

const clientId = process.env.DISCORD_CLIENT_ID;

module.exports = {
    colors: {
        succes: '#57F287',
        error: "#ED4245",
        normal: "#5865F2"
    },

    discord: {
        token: process.env.DISCORD_TOKEN,
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        owners: process.env.DISCORD_OWNERS,
        dev_server: process.env.DISCORD_DEV_GUILD,
        invite: process.env.DISCORD_SUPPORT_INVITE,
        prefix: '!',
        footer: `© Nova 1899 - ${new Date().getFullYear()}`, 
        botInvite: `https://discord.com/oauth2/authorize?&client_id=${clientId}&scope=applications.commands+bot&permissions=8`,
        serverInvite: "",
        app_id: process.env.DISCORD_APP_ID
    },

    app: {
        global_commands: true,
    }
};