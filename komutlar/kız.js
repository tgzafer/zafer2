//North
const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("732567345377050739"))
    return message.channel.send(
      `Bu komutu kullanabilmek için \`'Registrar'\` yetkisine sahip olmasınız.`
    );
//North
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("Kullanıcıyı etiketlemeyi unuttun.");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  member.addRole("732567345356341378");
  member.addRole("732567345356341381");
  member.addRole("732567345356341382");
  member.removeRole("732567345129586738");// Bunları çoğaltarak daha fazla rol verebilir veya alabilirsiniz
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(
      `Perm Verme işlemi başarılı`,
      `**Perm Verilen kullanıcı :** ${kullanıcı} \n**Komut işleminde verilen roller :** \`'Aphrodite,XX,Sea'\``
    )
    .setThumbnail(client.user.avatarURL)
    .setFooter(
      `Komutu kullanan yetkili : ${message.author.username} | Created by Wialinda`
    );
  return message.channel.send(embed);
};
//North
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız", 'k',],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "kız",
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "kız"
};
//North