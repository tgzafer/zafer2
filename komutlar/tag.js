const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let guild = message.guild;
  if (message.guild.id !== "732567344085467218") return; //Sunucu ID GİR
  let yetkili = "Commander";
  if (!message.member.hasPermission("ADMINISTRATOR"))
  if (!message.member.roles.has("732567344085467218"))
    return message.channel.send(
      `Bu komutu kullanabilmek için Register yetkisine sahip olmasınız.`
    );//Kayıt yetklisi id
  let user = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!user)
    return message.channel.send(
    "⏂"
 );
  let member = message.guild.member(user);
  member.addRole("726130213364432964");//rol 
  member.addRole("726130213364432966");//rol

  let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(
      `⏂`
    ); 
  return message.channel.send(embed);
}; 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek", "bay", "man"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "tag",
  description: "boşluk",
  usage: "tag"
};
