const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  // Ayarlamak istediğiniz premium rolün ID'sini buraya yazın
  const premiumRoleID = '1133446718726344894'; // Değiştirin

  // Kullanıcının belirlediğiniz premium role sahip olup olmadığını kontrol edin
  if (!msg.member.roles.cache.has(premiumRoleID)) {
    return msg.channel.send('Bu komutu kullanabilmek için premium üye olmalısınız. [Satın Al]');
  }

  const çekiliş = new Discord.MessageEmbed()
    .setAuthor(`RiseBunny Premium Kayıt Sistemi| YapayZeka Kayıt Sistemi (Beta)  `)
    .setTitle(`<a:spin:1140645416828932228>`)
    .setImage('https://cdn.discordapp.com/attachments/1108819464524415097/1109034877774483466/standard_7.gif')
    .setColor(`RANDOM`)
    .addField(
      `**Kayıt Kanalı** `,
      `💓  \`${prefix}ykayıt-kanal #kanal\` \nKayıtın Yapılacağı kanalı belirlersiniz. `,
      true
    )
    .addField(
      `**Kayıtsız Rol Belirle**`,
      `💓  \`${prefix}ykayıt-kayıtsız @rol\` \nKayıtsız Rolünü Sunucuya Giren kişiye verir ve kayıt olana kadar bu rol kalır!`,
      true
    )
    .addField(
      `**Erkek Rolü Belirle**`,
      `💓  \`${prefix}ykayıt-erkek @rol\` \nBelirttiğiniz erkek rolünü kullanıcılar başarı ile kayıt sonrasında alabilirler.`,
      true
    )
    .addField(
      `**Tag Belirle (İsteğe bağlı)**`,
      `💓  \`${prefix}ykayıt-tag <Tag>\` \nBaşarı ile kayıt tamamlandıktan sonra kullanıcılar belirlediğiniz Tag'ı alır.`,
      true
    )
    .addField(
      `**Kadın Rolü Belirle**`,
      ` 💓 \`${prefix}ykayıt-kadın  @rol\` \nKadın olarak kayıt edilecek kullanıcıların başarılı kayıt sonucunda aldığı roldür.`,
      true
    )
    .addField(
      `**Kayıt Sistemini Kapat**`,
      ` 💓  \`${prefix}ykayıt-kapat\` \nYapayZeka kayıt kapatılır ve veriler sıfırlanır!`,
      true
    );
  msg.channel.send(çekiliş);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["y-kayıt-sistem", 'y-kayıt-sistemi', 'ykayıt-sistemi', 'ykayıtsistem', 'y-kayıtsistemi'],
  kategori: "yardım",
  permLevel: 0
};

exports.help = {
  name: "ykayıt-sistem",
  description: "İstediğiniz kullanıcını bilgilerini gösterir.",
  usage: ""
};
