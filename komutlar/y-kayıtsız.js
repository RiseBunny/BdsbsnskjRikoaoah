const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Ayarlamak istediğiniz premium rolün ID'sini buraya yazın
  const premiumRoleID = '1133446718726344894'; // Değiştirin

  // Kullanıcının belirlediğiniz premium role sahip olup olmadığını kontrol edin
  if (!message.member.roles.cache.has(premiumRoleID)) {
    return message.channel.send('Bu komutu kullanabilmek için premium üye olmalısınız. [Satın Al](https://discord.gg/4XeWqvYMYJ)');
  }

  if (!message.mentions.roles.first()) return message.reply('Ayarlamak istediğin Kayıtsız rolünü etiketlemelisin!');

  const role = message.mentions.roles.first();
  database.set(`kayıt-kayıtsız.${message.guild.id}`, role.id);
  return message.channel.send(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Rol Başarıyla Ayarlandı!')
    .setFooter('Kanalı değiştirmek istersen tekrar etiketlemelisin.')
    .setDescription(`» Kayıtsız Rolü: **${role.name}** olarak ayarlandı!`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıtkayıtsız', 'y-kayıt-kayıtsız', 'y-k-kayıtsız'],
  permLevel: 0
};

exports.help = {
  name: 'ykayıt-kayıtsız'
};
