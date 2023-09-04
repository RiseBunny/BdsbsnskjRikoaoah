const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Ayarlamak istediğiniz premium rolün ID'sini buraya yazın
  const premiumRoleID = '1133446718726344894'; // Değiştirin

  // Kullanıcının belirlediğiniz premium role sahip olup olmadığını kontrol edin
  if (!message.member.roles.cache.has(premiumRoleID)) {
    return message.channel.send('Bu komutu kullanabilmek için premium üye olmalısınız. [Satın Al](https://discord.gg/4XeWqvYMYJ)');
  }

  // Kayıt sistemini sıfırla
  database.delete(`kayıt-kadın.${message.guild.id}`);
  database.delete(`kayıt-tag.${message.guild.id}`);
  database.delete(`kayıt-kayıtsız.${message.guild.id}`);
  database.delete(`kayıt-erkek.${message.guild.id}`);
  database.delete(`kayıt-kanal.${message.guild.id}`);

  return message.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setURL('https://discord.gg/4XeWqvYMYJ')
    .setTitle(client.user.username + ' | AI-Kayıt Sistemi')
    .setDescription(`**Kayıt sistemi başarıyla sıfırlandı!**
Bize neden sıfırladığınızı söylemek ister misiniz?
r!öneri ile bizd bildirin :)

**Hatamız olduysa düzeltmeyi çok istiyoruz <3**`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıtkapat', 'y-kayıt-kapat', 'y-k-kapat'],
  permLevel: 0
};

exports.help = {
  name: 'ykayıt-kapat'
};
