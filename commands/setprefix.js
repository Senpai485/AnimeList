const prefixModel = require("../models/prefix")



module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Nao tens perms necessarias para trocar o prefixo")
    let member = message.guild.members.cache.get(client.user.id);
    
    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });

    if (!args[0]) return message.channel.send('Voce deve colocar um novo prefixo');

    if (args[0].length > 5) return message.channel.send('O teu prefixo tem no maximi \`5\` Caracteres!')

    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`Novo prefixo setado **\`${args[0]}\`**`);

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    } else if (!data) {
        message.channel.send(`Novo prefixo setado **\`${args[0]}\`**`);

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
        })
        newData.save();
    }
   
   member.setNickname(`[${args[0]}] Anime List`);
}

module.exports.config = {
    name: "setprefix",
    aliases: ["sp"]
}
