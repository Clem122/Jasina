const Discord = require('discord.js');
const fetch = require('node-fetch');
const prefix = "$";
var express = require ('express');
var moment = require('moment');

client.on('ready',() =>{
    console.log('Siema pizdo');  
})

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
