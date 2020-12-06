const Discord = require('discord.js');
const fetch = require('node-fetch');
exports.run = async (client, messsage, args) => {

    const nosearch = new Discord.MessageEmbed()
        .setColor("#FF665B")
        .setTitle("Invalid argument")
        .setDescription("a!" + "wiki [search word]")
        .setFooter("Encontra algo")

    const args1 = messsage.content.split(' ').slice(1);
    const search = args1.join('_');

    if (!search) return messsage.channel.send(nosearch)

    const searchword = encodeURI(search)

    const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + searchword);
    const data = await res.json();

    const title = data.title;
    const text = data.extract || "nada encontrado";

    let thumbnail

    if (data.originalimage) {
        thumbnail = data.originalimage.source;
    } else {
        thumbnail = null
    }

    let url

    if (data.content_urls) {
        url = data.content_urls.desktop.page
    } else {
        url = null
    }

    const jokeembed = new Discord.MessageEmbed()
        .setColor(`#009900`)
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription(text)
        .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")

    await messsage.channel.send(jokeembed)

};

module.exports.config = {
    name: "wiki",
    aliases: []
}
