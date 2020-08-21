const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const serverStats = {
    guildID: '746030108460056718',
    totalUsersID: '746082964839858247',
    clock: '746363233816018946',
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
    client.channels.get(serverStats.clock).setName(`WITAJ N`);
    client.channels.get(serverStats.clock).setName(`WITAJ N`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <-`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <-`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <--`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <--`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <--`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <--`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <-`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <-`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA <`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA`);
    client.channels.get(serverStats.clock).setName(`WITAJ NA`);
    client.channels.get(serverStats.clock).setName(`WITAJ N`);
    client.channels.get(serverStats.clock).setName(`WITAJ N`);
    client.channels.get(serverStats.clock).setName(`WITAJ`);
    client.channels.get(serverStats.clock).setName(`WITAJ`);
    client.channels.get(serverStats.clock).setName(`WITA`);
    client.channels.get(serverStats.clock).setName(`WITA`);
    client.channels.get(serverStats.clock).setName(`WIT`);
    client.channels.get(serverStats.clock).setName(`WIT`);
    client.channels.get(serverStats.clock).setName(`WI`);
    client.channels.get(serverStats.clock).setName(`WI`);
    client.channels.get(serverStats.clock).setName(`W`);
    client.channels.get(serverStats.clock).setName(`W`);
    client.channels.get(serverStats.clock).setName(`#`);
    client.channels.get(serverStats.clock).setName(`#`);
    client.channels.get(serverStats.clock).setName(`#T`);
    client.channels.get(serverStats.clock).setName(`#T`);
    client.channels.get(serverStats.clock).setName(`#TE`);
    client.channels.get(serverStats.clock).setName(`#TE`);
    client.channels.get(serverStats.clock).setName(`#TEA`);
    client.channels.get(serverStats.clock).setName(`#TEA`);
    client.channels.get(serverStats.clock).setName(`#TEAM`);
    client.channels.get(serverStats.clock).setName(`#TEAM`);
    client.channels.get(serverStats.clock).setName(`#TEAMB`);
    client.channels.get(serverStats.clock).setName(`#TEAMB`);
    client.channels.get(serverStats.clock).setName(`#TEAMBA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAK`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAK`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁ`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁ`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻ`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻ`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻA`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻAN`);
    client.channels.get(serverStats.clock).setName(`#TEAMBAKŁAŻAN`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲ ❤`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲ ❤`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲ ❤`);
    client.channels.get(serverStats.clock).setName(`#̲T̲E̲A̲M̲B̲A̲K̲Ł̲A̲Ż̲A̲N̲ ❤`);
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

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
