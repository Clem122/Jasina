const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");
const ms = require("ms");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const serverStats = {
    guildID: '746030108460056718',
    totalUsersID: '746082964839858247',
    clock: '746036284568371242',
    newUser: '746082991230419005'
}

client.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
    client.channels.get(serverStats.newUser).setName(`👋 ${member.displayName}`);
 });

client.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
});

client.on('ready', () => {
    let autopisanko = "10s";
    setInterval(function() {
    client.channels.get(serverStats.clock).setName(`W`);
    client.channels.get(serverStats.clock).setName(`W`);
    client.channels.get(serverStats.clock).setName(`WI`);
    client.channels.get(serverStats.clock).setName(`WI`);
    client.channels.get(serverStats.clock).setName(`WIT`);
    client.channels.get(serverStats.clock).setName(`WIT`);
    client.channels.get(serverStats.clock).setName(`WITA`);
    client.channels.get(serverStats.clock).setName(`WITA`);
    client.channels.get(serverStats.clock).setName(`WITAJ`);
    client.channels.get(serverStats.clock).setName(`WITAJ`);
}, 600);
 });

client.on("guildMemberAdd", member => {
    member.user.sendMessage(`Witaj na serwerze **#TeamBakłażan** :hand_splayed:\n\nZalecamy zapoznać się z kanałem **#zasady-info**\n\nJako serwer oferujemy miłą atmosfere jak i częste konkursy.\n\nCała administracja życzy dobrej zabawy :heart:\n\nhttps://discord.gg/bBVWbNd`);
});

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px impact`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.find(ch => ch.name === 'ogólny');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./welcome-image.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '35px impact';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Witaj na serwerze', canvas.width / 3.2, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 3.2, canvas.height / 1.7);

	ctx.beginPath();
	ctx.arc(120, 125, 90, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 20, 25, 190, 190);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`:eggplant: **${member}** **Właśnie dołączył na serwer! Zerknij do regulaminu i baw się dobrze** :eggplant:`, attachment);
});

client.on('message', (message) => {
    if (message.content == 'ping') {
        message.channel.sendMessage(`Pong! ${Date.now() - message.createdAt.getTime()}ms`);
    }
});

client.on('message', message => {
    if (message.content === '$warn') {
      message.channel.send(':no_entry: | Użyj tego poprawnie: `$warn @użytkownik (powód)`');
  	}
});

client.on('message', async message => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let warn = message.content.split(" ").slice(2);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.reply("Couldn't find them yo");
  const ms = require("ms");

  if(!warns[wUser.id]) warns[wUser.id] = {
  warns: 0
};

warns[wUser.id].warns++;

fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
  if (err) console.log(err)
});

if (command == "warn") {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":potato: Nie masz uprawnień :) :potato:")
  let person = message.mentions.members.first();
  if(!person) return message.reply("Couldn't find them yo");
    if (message.author.bot) return;
      if(!message.channel.guild) return message.reply('ta');
   let say2 = new Discord.RichEmbed()
  .setAuthor("WARN")
    .setColor(8991829)
      .addField("Ostrzeżono użytkownika", `<@${wUser.id}>`)
      .addField("Powód", warn.join("  "))
    let say = new Discord.RichEmbed()
  .setThumbnail("https://static.thenounproject.com/png/34721-200.png")
  .setAuthor("WARN")
    .setColor(8991829)
      .addField("Ostrzeżony użytkownik", `<@${wUser.id}>`)
      .addField("Ostrzeżony przez", `${message.author.username}`)
      .addField("Powód", warn.join("  "))
      .addField("Liczba ostrzeżeń", warns[wUser.id].warns);
    message.guild.channels.find('name','logi-kar').send(say);
    message.channel.sendMessage(say2);

    message.delete();
  }

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("Error. Brakuje roli muted");

    let mutetime = "600s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> został tymczasowo wyciszony za przekroczenie 3 warnów`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> może znowu pisać`)
    }, ms(mutetime))
  }

});

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let command = message.content.split(" ")[0];

    if (message.channel.id === '746387780460085409')
    if (command) {
    message.delete(800)

 }

});

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
