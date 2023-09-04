const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Ayarlamak istediğiniz premium rolün ID'sini buraya yazın
  const premiumRoleID = '1133446718726344894'; // Değiştirin

  // Kullanıcının belirlediğiniz premium role sahip olup olmadığını kontrol edin
  if (!message.member.roles.cache.has(premiumRoleID)) {
    return message.channel.send('Bu komutu kullanabilmek için premium üye olmalısınız. [Satın Al](https://discord.gg/4XeWqvYMYJ)');
  }

  if (!message.mentions.channels.first()) return message.channel.send(`⚠️ Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: !kayıt-kanal #kayitkanal`);
  const channel = message.mentions.channels.first();

  // Eğer kullanıcı gerekli role sahipse, işlemi gerçekleştir
  database.set(`kayıt-kanal.${message.guild.id}`, channel.id);
  return message.channel.send(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Kanal Başarıyla Ayarlandı!')
    .setFooter('Kanalı değiştirmek istersen tekrar etiketlemelisin.')
    .setDescription(`» Kanal: ${channel} olarak ayarlandı!`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıtkanal', 'y-kayıt-kanal', 'y-k-kanal'],
  permLevel: 0
};

exports.help = {
  name: 'ykayıt-kanal'
};
