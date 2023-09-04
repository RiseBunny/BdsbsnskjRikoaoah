const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Ayarlamak istediğiniz premium rolün ID'sini buraya yazın
  const premiumRoleID = '1133446718726344894'; // Değiştirin

  // Kullanıcının belirlediğiniz premium role sahip olup olmadığını kontrol edin
  if (!message.member.roles.cache.has(premiumRoleID)) {
    return message.channel.send('Bu komutu kullanabilmek için premium üye olmalısınız. [Satın Al](https://discord.gg/4XeWqvYMYJ)');
  }

  if (!args[0]) return message.reply(`**Tag ayarlamak için:**\` r!kayıt-tag TAGINIZ\`\n**Tag Sıfırlamak / Kaldırmak için:**\` !kayıt-tag sıfırla\``);

  if (args[0] === 'sıfırla') {
    database.delete(`kayıt-tag.${message.guild.id}`);
    return message.reply('**Tag başarıyla sıfırlandı!**');
  } else {
    database.set(`kayıt-tag.${message.guild.id}`, args[0]);
    return message.channel.send(new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Tag Başarıyla Ayarlandı!')
      .setFooter('Tag değiştirmek istersen tekrar etiketlemelisin. / Silmek için: r!y-kayıttag sıfırla')
      .setDescription(`» Ayarlanan Tag: **${args[0]}** olarak ayarlandı!`));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıttag'],
  permLevel: 0
};

exports.help = {
  name: 'ykayıt-tag'
};
