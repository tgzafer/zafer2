//Glitch için olan yer
const express = require("express");
const app = express();
const http = require("http");

app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Sabitler
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
require("./util/eventLoader")(client);



var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("guildMemberAdd", async member => {
  let gkisi = client.users.get(member.id);

  const ktarih = new Date().getTime() - gkisi.createdAt.getTime();
  if (ktarih < 2592000001) member.addRole("732567345016602753"); //fake üyeye verilecek rol
  member.removeRole("732567345129586738"); //fake üyeden alınacak rol
});

client.on("guildMemberAdd", member => {
  const kanal = "732567345607737400"; //kişi geldiği zaman mesaj atılacak kanal id
  moment.locale("tr"); // Saat icin gerekli
  let samet = client.channels.get(kanal);
  samet.send(
    " " +
      member +
    "** The Sea'ya Hoş Geldin! <a:kalp:732970174231347200>**\n\n **<a:Marti:733268478253072476> Seninle Birlikte " +
      member.guild.memberCount +
      " Kişiyiz!** \n\n **<a:maden:735520709173968946> Kayıt işleminin başlaması için,<@&732567345377050739> yetkililerini etiketleyip ses teyit odalarına geçebilirsin.**  \n\n **<a:siyahkalp:732970141901389885> Hesabın Oluşturulma Tarihi :** " +
      moment(member.user.createdAt).format("DD MMMM YYYY, dddd  hh:mm:ss ") +
      " \n\n **<a:pin:735520719164932188> Kayıt işlemininin tamamlanması için ses vermek zorunludur! **",
    new Discord.Attachment(
      "https://cdn.discordapp.com/attachments/732567345607737400/734390159017115718/giphy_1.gif"
    )
  );
});

client.on("ready", () => {
  client.channels.get("732567347088588863").join();
});