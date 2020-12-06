const Discord = require('discord.js');
const config = require('./config.json')


const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});


const {

    loadCommands
} = require('./utils/loadCommands');

const mongoose = require('mongoose');

const prefix = require('./models/prefix');
console.log("Ligando a DB Principal\n======================================")
mongoose.connect('sua Db aqui', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  
});

//STREAMING = TRANSMITINDO
//LISTENING = OUVINDO
//PLAYING = JOGANDO
//WATCHING = ASSISTINDO



console.log("Iniciando o bot\n======================================")

client.on('ready', () => {
    
    console.log( `Estou viva meu amor` );
    const activities = [
      { name: "Fui codado por (clique em assistir)", type: "STREAMING", url: "https://www.twitch.tv/senpai986"},
      { name: `📡Atualmente temos ${client.users.cache.size} membros!📡`, type: "PLAYING", url: "https://www.twitch.tv/senpai986"},
      { name: `📡a!ownerserver para descobrir onde fui criada📡`, type: "STREAMING", url: "https://www.twitch.tv/senpai986"}
    ]
  
    setInterval(() => {
      const {name, ...options} = activities[Math.floor(Math.random() * activities.length)]
      client.user.setActivity(name, options)
    }, 1000 * 60)
  });



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.on('message', async (message) => {
    

    //Getting the data from the model
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    const bot = client;

    
    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    } else if (!data) {
   
        const prefix = "a!";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(client, message, args);
    }

   


})



client.on('message', async (message) => {
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });
   
    if(data) {
        const prefix = data.Prefix;

        if (message.mentions.members.size > 0) {
            let mention = message.content.split(/ +/g)[0];
            if (mention === `<@${client.user.id}>` || mention === `<@!${client.user.id}>`) {
                message.reply(`Opa eu meu prefixo atual é ${prefix} .\n Para conheçer os meus comandos use ${prefix}help `)
            }
        }
    } else if (!data) {
      
        const prefix = "a!";
        
        if (message.mentions.members.size > 0) {
            let mention = message.content.split(/ +/g)[0];
            if (mention === `<@${client.user.id}>` || mention === `<@!${client.user.id}>`) {
                message.reply(`Opa eu meu prefixo atual é ${prefix} .\n Para conheçer os meus comandos use ${prefix}help `)
            }
        }
    }

})




console.log(" bot Iniciado")
client.login(config.token)
