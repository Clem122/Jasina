const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");
const ms = require("ms");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))
const serverStats = {
    guildID: '746030108460056718',
    totalUsersID: '746082964839858247',
    clock: '746036284568371242',
    newUser: '746082991230419005'
}

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.id === '')
        await message.delete();
    if(message.content.toLowerCase() === '!verify' && message.channel.id === '746423667411648573')
    {   
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.cache.get('● Zweryfikowany');
        if(role) {
            try {
                await message.member.roles.add(role);
                console.log("● Nowy");
            }
            catch(err) {
                console.log(err);
            }
        }
    }
});

client.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
    client.channels.get(serverStats.newUser).setName(`👋 ${member.displayName}`);
 });

client.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
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

client.on('message', message => {
  if (message.content === prefix + 'ping') {
    message.channel.send({embed: {
  color: 101981,
  description: (':ping_pong:  `' + `${Date.now() - message.createdTimestamp}` + ' ms`'),
  title: " ",
  author: {
  name: "Twój ping to", 
  icon_url: message.author.avatarURL
    },
  image: {
  "url": " ",
    },
  thumbnail: {
  "url": " "
    },
}});
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

    if (message.channel.id === '746423667411648573')
    if (command) {
    message.delete(800)

 }

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if (command === "nigdytegoniezgadniesz913xdjg") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => { });
        // And we get the bot to say the thing:
        const embed = {
            "title": "Hej! Zweryfikuj konto",
            "description": `${sayMessage}`,
            "color": 11041206
        };
        message.channel.send({ embed });
}
});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if (command === "ogloszenie") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => { });
        // And we get the bot to say the thing:
        const embed = {
            "title": ":bell: OGŁOSZENIE",
            "description": `${sayMessage}`,
            "color": 16777215
        };
        message.channel.send({ embed });
}
});

client.on('message', async message => {
    if (message.content.startsWith('$clear')) {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":potato: Nie masz uprawnien :) :potato:")
        const args = message.content.slice(1).trim().split(/ +/g);
        console.log(args);
        const messagecount = parseInt(args[1], 10);
        console.log(messagecount);
        if (!messagecount || messagecount < 2 || messagecount > 200)
            return message.reply('Minimalna liczba wyczyszczenia to 2');
        let fetchmessage = await message.channel.fetchMessages({ count: messagecount });
        message.channel.bulkDelete(messagecount)
        message.channel.sendMessage("**Usunięto** "+messagecount)
    }
}); 

client.on('message', message => {
  if (message.content === prefix + 'info') {
    message.channel.send({embed: {
  color: 10721349,
  description: (`Pełna nazwa ${message.author.username}\nTwoje ID: ${message.author.id}\nKonto stworzone: ${message.author.createdAt}`),
  title: " ",
  author: {
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
  text: "© Example"
    },
  name: message.author.username, 
  icon_url: message.author.avatarURL
    },
  image: {
  "url": " ",
    },
  thumbnail: {
  "url": message.author.avatarURL
    },
}});
  }
});

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.login(process.env.BOT_TOKEN);
