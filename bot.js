const Discord = require('discord.js');
const client = new Discord.Client();
const serverStats = {
    guildID: '746030108460056718',
    totalUsersID: '746082964839858247',
    memberCountID: '746082991230419005',
    newUser: '746087439856173179'
};

client.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`» Ludzi: ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCount).setName(`» Botów: ${member.guild.members.filter(m => m.user.bot).size}`);
    client.channels.get(serverStats.newUser).setName(`👋 ${member.displayName}`);
 });

client.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`» Użytkowników: ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`» Ludzi: ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCount).setName(`» Botów: ${member.guild.members.filter(m => m.user.bot).size}`)
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
