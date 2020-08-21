const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");
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

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let command = message.content.split(" ")[0];

if (command == "$unmute") {
  const ms = require("ms");
  let unmuteMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!unmuteMute) return message.reply("**Użyj $unmute <użytkownik>**");
  if(unmuteMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  let unmutePermRole = message.guild.roles.find(`name`, "muted"); //set Perm Muted to your perm mute role

if (!unmutePermRole) return;
if (unmutePermRole){
  try {
    unmuteMute.removeRole(unmutePermRole.id);
    message.channel.send(`***Pomyślnie usunięto mute!*** :heart:`);
  } catch(e) {
    console.log(e.stack);
  }
}

message.delete();

if (!unmutePermRole) return;
let unmuteTempRole = message.guild.roles.find(`name`, "Temp Mute"); //set Temp Mute to your temp mute role
if (unmuteTempRole){
  try{
    unmuteMute.removeRole(unmuteTempRole.id);
  } catch(e) {
    console.log(e.stack);
  }
}
}

});

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let command = message.content.split(" ")[0];

if (command == "$mute") {
  const ms = require("ms");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":potato: **Nie masz uprawnień :)** :potato:");
  let tomutem = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomutem) return message.reply("**Użyj $mute <użytkownik> <czas> <powód>.**");
  if(tomutem.hasPermission("MANAGE_MESSAGES")) return message.reply("**Haha! Nie możesz zbanować admina**");
  let reasonm = args.slice(2).join(" ");
  if(!reasonm) return message.reply("**Podaj powód**");

  let muterolem = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterolem){
    try{
      muterolem = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterolem, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetimem = args[1];
  if(!mutetimem) return message.reply("**Nie okresliłeś czasu, pamiętaj aby nie naciskać spacji po oznaczeniu");

  message.delete().catch(O_o=>{});

  try{
    await tomutem.send(`**Zostałeś zmutowany na ${message.guild.name}! Czas: ${mutetimem} Powód: ${reasonm}**`)
  }catch(e){
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`MUTE`)
  .setThumbnail("http://www.clker.com/cliparts/f/B/6/Z/x/f/mute-button-text.svg.med.png")
  .setColor("1")
  .addField("Wyciszony użytkownik", tomutem)
  .addField("Wyciszony przez", message.author)
  .addField("Czas", mutetimem)
  .addField("Powód", reasonm);

  let muteembed2 = new Discord.RichEmbed()
  .setDescription(`MUTE`)
  .setColor("1")
  .addField("Wyciszony użytkownik", tomutem)
  .addField("Powód", reasonm);

  message.channel.sendMessage(muteembed2);

  let incidentschannel = message.guild.channels.find(`name`, "logi-kar");
  if(!incidentschannel) return message.reply("Error! Nie ma kanału logi-kar");
  incidentschannel.send(muteembed);

  await(tomutem.addRole(muterolem.id));

  setTimeout(function(){
    tomutem.removeRole(muterolem.id);
    message.channel.send(`<@${tomutem.id}> **odsiedział swoją kare!**`);
  }, ms(mutetimem));

}

});

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let command = message.content.split(" ")[0];

if (command == "$kick") {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Użyj $kick <użytkownik> <powód>");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":potato: Nie masz uprawnień :) :potato:");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Haha! Nie możesz wyrzucić admina");
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("KICK")
      .setThumbnail("https://d30y9cdsu7xlg0.cloudfront.net/png/380644-200.png")
      .setColor("1")
      .addField("Wyrzucony użytkownik", `${kUser} z ID ${kUser.id}`)
      .addField("Wyrzucony przez", `<@${message.author.id}>`)
      .addField("Powód", kReason)
      .addField("Czas", message.createdAt);

      let kickEmbed2 = new Discord.RichEmbed()
      .setDescription("KICK")
      .setColor("1")
      .addField("Wyrzucony użytkownik", `${kUser}`)
      .addField("Powód", kReason);

      let kickChannel = message.guild.channels.find(`name`, "logi-kar");
      if(!kickChannel) return message.channel.send("Error! Nie ma kanału logi-kar");

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
      message.delete();
      message.channel.sendMessage(kickEmbed2);

      return;
  }

if (command == "$ban") {

      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Użyj $ban <użytkownik> <powód>");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":potato: Nie masz uprawnień :) :potato:");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Haha! Nie możesz zbanować admina");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("BAN")
      .setThumbnail("http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-ban-icon.png")
      .setColor("1")
      .addField("Zbanowany", `${bUser} z ID ${bUser.id}`)
      .addField("Zbanowany przez", `<@${message.author.id}>`)
      .addField("Czas", message.createdAt)
      .addField("Powód", bReason);

      let banEmbed2 = new Discord.RichEmbed()
      .setDescription("BAN")
      .setColor("1")
      .addField("Zbanowany", `${bUser}`)
      .addField("Powód", bReason);

      let incidentchannel = message.guild.channels.find(`name`, "logi-kar");
      if(!incidentchannel) return message.channel.send("Error! Nie ma kanału logi-kar");

      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);
      message.channel.sendMessage(banEmbed2);

      return;
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

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
