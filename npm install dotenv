const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(express.json());

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const DISCORD_CHANNEL_ID = '1366463733936947222';
const DISCORD_BOT_TOKEN = 'Token'; // Don't share!

bot.once('ready', async () => {
    console.log('✅ Bot is online!');

    // Send activation message
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
