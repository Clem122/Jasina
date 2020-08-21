const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if (message.content == 'ping') {
        message.channel.sendMessage(`Pong! ${Date.now() - message.createdAt.getTime()}ms`);
    }
});

bot.login(process.env.BOT_TOKEN);
