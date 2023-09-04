const tts = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "speech",
    description: "Yazıyı MP3 (ses) dosyasına dönüştürür.",
    args: true,
    usage: "<text>",
    async execute(message, args) {
        const text = args.join(" ");

        message.channel.send("Yazı ses dosyasına dönüştürülüyor...").then(async (msg) => {
            try {
                const audioUrl = tts.getAudioUrl(text, {
                    lang: 'tr',
                    slow: false
                });

                const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
                const outputPath = `./src/output/${generateRandomString()}.mp3`;
                fs.writeFileSync(outputPath, response.data, 'binary');

                const attachment = new MessageAttachment(outputPath);
                msg.delete();
                message.channel.send({ content: "Yazı başarıyla ses dosyasına dönüştürüldü.", files: [attachment] });
                fs.unlinkSync(outputPath);
            } catch (error) {
                console.error(error);
                msg.edit("Yazı ses dosyasına dönüştürülürken bir hata oluştu.");
            }
        });
    },
};

const generateRandomString = () => {
    const chars = "0123456789";
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(randomIndex, randomIndex + 1);
    }

    return randomString;
};
