const Discord = require("discord.js");
const animeapi = require('@justalk/anime-api');
const inline = true

module.exports.run = async (client, message, args) => {


let name = args[(0)]
let ep = message.content.split(" ").slice(2).join(" ");

if(!name) {
    return message.channel.send(`**${message.author.username}**, coloque o nome do seu anime`)
  }

  if (!ep) { 
    return message.reply ("Coloque o episodio desejado")
              
}


 const download = await animeapi.download(`${name}`, ep);



 // console.log("---------->" + download[0].source)
 // console.log("---------->" + download[0].link)


const embed = new Discord.MessageEmbed()
.setTitle("Animes List")
.setColor("")
.setDescription(`Nome do anime que vc colocou: **${name}**`)
.addField("name", download[0].source, inline )
.addField("link", download[0].link, inline )
.setColor("RANDOM")

message.reply(embed)

}

module.exports.config = {
    name: "anime",
    aliases: ["an"]
}
