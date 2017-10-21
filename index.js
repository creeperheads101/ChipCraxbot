const Discord = require('discord.js');
const bot1 = new Discord.Client();

bot1.on('message', (message) => {
    if(message.content == '!whitelist') {
        message.author.sendMessage("https://cdn.discordapp.com/attachments/368956506089062402/371093886082351105/Whitelister.zip")
    }
});

bot1.on('message', (message) => {
    if(message.content == '!whitelist nge78ghb3') {
        var role = member.guild.roles.find('name', 'Buyers');
        member.addRole(role)
    }
});






bot1.login(process.env.BOT_TOKEN);


