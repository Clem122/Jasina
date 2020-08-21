const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Discord.Client();
const prefix = "$";

client.on('ready',() =>{
    console.log('Siema pizdo');  
})

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
