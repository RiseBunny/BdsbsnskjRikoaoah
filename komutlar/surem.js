const Discord = require('discord.js');
const Canvas = require('canvas');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Kullanıcıya verilen rolü ve süreyi veritabanından alın
  const hedefKullanici = message.author;
  const rolID = database.get(`suresi.${message.guild.id}.${hedefKullanici.id}`);
  
  if (!rolID) {
    return message.reply('Üzerinizde süreli bir rol bulunmuyor.');
  }
  
  const sonlanmaZamani = database.get(`suresi.${message.guild.id}.${hedefKullanici.id}.${rolID}.sonlanmaZamani`);
  const kalanSureMs = sonlanmaZamani - Date.now();
  
  // Rol ID'sini kullanarak rolü bulun
  const rol = message.guild.roles.cache.get(rolID);
  
  // Canvas oluşturun
  const canvas = Canvas.createCanvas(600, 200);
  const ctx = canvas.getContext('2d');
  
  // Arka plan rengini ayarlayın
  ctx.fillStyle = '#36393F'; // Örnek olarak Discord'un tema rengi
  
  // Arka planı boyayın
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Yazı rengini ayarlayın
  ctx.fillStyle = '#FFFFFF'; // Beyaz renk
  
  // Yazı fontunu ve boyutunu ayarlayın
  ctx.font = '30px sans-serif';
  
  // Sağ alt köşeye RiseBunny yazın
  ctx.fillText('RiseBunny', canvas.width - 150, canvas.height - 20);
  
  // Orta kısma kalan süreyi yazın
  const kalanSureStr = formatKalanSure(kalanSureMs);
  ctx.fillText(`Kalan Süre: ${kalanSureStr}`, 30, canvas.height / 2);
  
  // Botun resmini ekleyin
  const botAvatar = await Canvas.loadImage('https://media.discordapp.net/attachments/1118567518454423593/1148178387886686228/NG20230813-0634142.png'); // BOT_RESIM_URL yerine botun resim URL'sini ekleyin
  ctx.drawImage(botAvatar, 10, 10, 100, 100); // Resmin boyutunu ve konumunu ayarlayın
  
  // Canvas'ı bir resim olarak gönderin
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'suresi.png');
  message.channel.send(attachment);
};

function formatKalanSure(ms) {
  const saniye = Math.floor((ms / 1000) % 60);
  const dakika = Math.floor((ms / (1000 * 60)) % 60);
  const saat = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const gun = Math.floor(ms / (1000 * 60 * 60 * 24));
  
  let formatted = '';
  if (gun > 0) formatted += gun + ' gün ';
  if (saat > 0) formatted += saat + ' saat ';
  if (dakika > 0) formatted += dakika + ' dakika ';
  if (saniye > 0) formatted += saniye + ' saniye ';
  
  return formatted.trim();
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sürem', 'süresi', 'sürebak'],
  permLevel: 0
};

exports.help = {
  name: 'sürem',
  description: 'Üzerinizdeki süreli rolün kalan süresini gösterir.',
  usage: 'sürem'
};
