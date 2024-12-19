require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const { google } = require('googleapis');
const fs = require('fs');
const fetch = require('node-fetch');
const youtube = google.youtube('v3');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Daftar API keys
const YOUTUBE_API_KEYS = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
  process.env.YOUTUBE_API_KEY_4,
  process.env.YOUTUBE_API_KEY_5,
  process.env.YOUTUBE_API_KEY_6,
  process.env.YOUTUBE_API_KEY_7,
  process.env.YOUTUBE_API_KEY_8,
  process.env.YOUTUBE_API_KEY_9,
  process.env.YOUTUBE_API_KEY_10,
  process.env.YOUTUBE_API_KEY_11,
  process.env.YOUTUBE_API_KEY_12,
  process.env.YOUTUBE_API_KEY_13,
  process.env.YOUTUBE_API_KEY_14,
  process.env.YOUTUBE_API_KEY_15,
  process.env.YOUTUBE_API_KEY_16,
  process.env.YOUTUBE_API_KEY_17,
  process.env.YOUTUBE_API_KEY_18,
  process.env.YOUTUBE_API_KEY_19,
  // Tambahkan key lainnya jika diperlukan
];

// Variabel untuk melacak status API key
const apiKeyStatus = YOUTUBE_API_KEYS.map((key, index) => ({
  key: key,
  usable: true,
  lastErrorTime: null,
  index: index
}));

// Load monitored channels
let monitoredChannels = [];
try {
  const data = fs.readFileSync('data.json', 'utf8');
  monitoredChannels = JSON.parse(data);
} catch (error) {
  console.error('Error loading monitored channels:', error);
}

// Load announced videos
let announcedVideos = [];
try {
  announcedVideos = JSON.parse(fs.readFileSync('announcedVideos.json', 'utf8') || '[]');
} catch (error) {
  console.log('No previous announced videos found.');
}

function saveAnnouncedVideos() {
  fs.writeFileSync('announcedVideos.json', JSON.stringify(announcedVideos, null, 2));
}

// Fungsi untuk mendapatkan API key yang dapat digunakan
function getUsableAPIKey() {
  const currentTime = Date.now();

  const availableKeys = apiKeyStatus.filter(status =>
    status.usable ||
    (status.lastErrorTime && currentTime - status.lastErrorTime > 3600000)
  );

  if (availableKeys.length > 0) {
    const selectedKey = availableKeys[0];
    selectedKey.usable = true;
    return selectedKey.key;
  }

  apiKeyStatus.forEach(status => {
    status.usable = true;
    status.lastErrorTime = null;
  });

  return YOUTUBE_API_KEYS[0];
}

// Fungsi untuk menandai API key sebagai tidak dapat digunakan
function markAPIKeyAsInvalid(apiKey) {
  const keyStatus = apiKeyStatus.find(status => status.key === apiKey);

  if (keyStatus) {
    keyStatus.usable = false;
    keyStatus.lastErrorTime = Date.now();
    console.log(`[${new Date().toISOString()}] API Key ${keyStatus.index + 1} marked as temporarily unavailable`);
  }
}

async function checkLatestVideos() {
  for (const channel of monitoredChannels) {
    const { youtubeChannelId, discordChannelId, roleId, profileImg, color } = channel;
    let apiKey;

    try {
      apiKey = getUsableAPIKey();
      console.log(`[${new Date().toISOString()}] --- YouTube API Request ---`);
      console.table([{
        'Channel ID': youtubeChannelId,
        'API Key Used': apiKey.substring(0, 10) + '...',
        'Request Timestamp': new Date().toISOString()
      }]);

      const searchResponse = await youtube.search.list({
        key: apiKey,
        channelId: youtubeChannelId,
        part: 'snippet',
        order: 'date',
        maxResults: 1,
      });

      const video = searchResponse.data.items[0];
      if (!video) continue;

      const videoId = video.id.videoId;
      if (!announcedVideos.includes(videoId)) {
        console.log(`[${new Date().toISOString()}] --- New Video Detected ---`);
        console.table([{ 'Video ID': videoId, 'Title': video.snippet.title }]);

        const videoResponse = await youtube.videos.list({
          key: apiKey,
          id: videoId,
          part: 'snippet,liveStreamingDetails',
        });

        const videoDetails = videoResponse.data.items[0];
        const { snippet, liveStreamingDetails } = videoDetails;
        const { liveBroadcastContent } = snippet;
        const { scheduledStartTime } = liveStreamingDetails || {};

        const announcementChannel = await client.channels.fetch(discordChannelId);
        if (!announcementChannel.isTextBased()) continue;

        const embed = new EmbedBuilder()
          .setAuthor({ name: snippet.channelTitle, iconURL: profileImg })
          .setImage(snippet.thumbnails.high.url)
          .setFooter({ text: `ReBot v3.0-jukutpremium` })
          .setTimestamp()
          .setThumbnail(profileImg)
          .setColor(color);

        let message = '';
        if (liveBroadcastContent === 'upcoming') {
          message = `Hi <@&${roleId}> ~\n**${snippet.channelTitle}** bakal ada livestream mendatang di tanggal **${new Date(scheduledStartTime).toLocaleString('id-ID', {
            dateStyle: 'long',
            timeStyle: 'short',
          })} WIB!**\nDateng yaaa~ UwU`;

          embed
            .setTitle(`${snippet.channelTitle} akan melakukan Livestream!`)
            .addFields(
              { name: 'Tanggal & Waktu live :', value: `${new Date(scheduledStartTime).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })} WIB​`, inline: false },
              { name: 'Link Video YouTube :', value: `https://youtu.be/${videoId}​`, inline: false },
              { name: 'Judul Live :', value: `${snippet.title}​`, inline: false }
            );
        } else if (liveBroadcastContent === 'none') {
          message = `Hi <@&${roleId}> ~\n**${snippet.channelTitle}** Baru aja release konten baru jangan lupa di check ya!!\nDateng yaaa~ UwU`;

          embed
            .setTitle(`${snippet.channelTitle} baru saja merilis konten baru!`)
            .addFields(
              { name: 'Tanggal & Waktu Upload :', value: `${new Date(snippet.publishedAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })} WIB​`, inline: false },
              { name: 'Link Video YouTube :', value: `https://youtu.be/${videoId}​`, inline: false },
              { name: 'Judul Live :', value: `${snippet.title}​`, inline: false }
            );
        }

        // Kirimkan pesan ke saluran Discord
        const sentMessage = await announcementChannel.send({ content: message, embeds: [embed] });
        
        // Menambahkan log informasi tentang konten yang dikirim
        console.log(`[${new Date().toISOString()}] Sent message to Discord channel: ${discordChannelId}`);
        console.log(`[${new Date().toISOString()}] Message content: ${message}`);
        console.log(`[${new Date().toISOString()}] Embed title: ${embed.data.title}`);

        // Tambahkan ID video ke announcedVideos setelah pengumuman
        announcedVideos.push(videoId);
        saveAnnouncedVideos();

        console.log(`[${new Date().toISOString()}] --- Video ID Saved ---`);
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error fetching videos for channel ${youtubeChannelId}:`, error);

      if (error.response &&
        (error.response.status === 403 ||
          (error.response.data &&
            error.response.data.error &&
            error.response.data.error.message.includes('quota')))) {
        if (apiKey) {
          markAPIKeyAsInvalid(apiKey);
        }
      }
    }
  }
}

client.on('ready', () => {
  console.log(`[${new Date().toISOString()}] Bot is ready and logged in as ${client.user.tag}`);

  client.user.setActivity({
    name: 'Re:Colorfull Memories',
    type: ActivityType.Listening,
  });

  setInterval(checkLatestVideos, 600000); // Cek setiap 10 menit
});

client.login(process.env.DISCORD_TOKEN);
