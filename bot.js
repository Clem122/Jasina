const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "$";

bot.on('ready',() =>{
    console.log('Siema pizdo');  
})

client.on("ready", () => {
    client.user.setActivity(`Clem jest fajna | Na ${client.guilds.size} serwerach <3`, { type: 'WATCHING' });
});

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
