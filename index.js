const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // <<--- Esto carga las variables del .env

const app = express();
app.use(express.json());

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

bot.once('ready', async () => {
    console.log('✅ Bot is online!');

    const channel = await bot.channels.fetch(DISCORD_CHANNEL_ID);
    if (channel) {
        channel.send('✅ Anticheat Bot is now active!');
    } else {
        console.error('❌ Could not find the channel to send activation message.');
    }
});

app.post('/alert', async (req, res) => {
    const { playerName, userId, time, alertType, reason } = req.body;

    try {
        const channel = await bot.channels.fetch(DISCORD_CHANNEL_ID);
        if (channel) {
            await channel.send(
                `⚠️ **AntiCheat Alert** ⚠️\n` +
                `**Player:** ${playerName} (${userId})\n` +
                `**Time:** ${time}\n` +
                `**Type:** ${alertType}\n` +
                `**Reason:** ${reason}`
            );
        } else {
            console.error('❌ Could not find the channel for alert.');
        }
    } catch (err) {
        console.error('❌ Error sending alert:', err);
    }

    res.sendStatus(200);
});

bot.login(DISCORD_BOT_TOKEN);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🌐 Server is listening on port ${port}`);
});
