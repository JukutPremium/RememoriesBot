<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=Re:Memories%20Bot&fontSize=70&fontAlignY=35" width="100%"/>
</div>

> This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Modifications or redistributions of this code must include the following statement in the `README.md`:

> "This project is based on code by juktupremium, and modifications were made."

# **Discord Bot Documentation**

## Overview
> This bot is a custom Discord bot that integrates with the YouTube API to send announcements of new live streams or video uploads to specific Discord channels. The bot checks YouTube channels periodically and sends messages to Discord channels when a new video or live stream is detected.

## Features
- **YouTube Integration**: Monitor multiple YouTube channels for new uploads or upcoming live streams.
- **Discord Notifications**: Send notifications to Discord channels about new content.
- **Role-Based Alerts**: Notify specific roles in the server when a new video or live stream is available.
- **Customizable**: Easily add and modify the monitored channels and related settings.

## Prerequisites
- **Node.js** (version 18 or higher)
- **npm** (Node package manager)
- **A Discord Bot Token** (create one by following the steps on Discord Developer Portal)
- **YouTube API Keys** (obtainable from Google Developers Console)
- **A Discord Server** (to test and run the bot)

## Installation
**1. Clone the repository**:

```js
git clone https://github.com/JukutPremium/RememoriesBot.git
```

**2. Install dependencies**:

```js
npm install
```

## Configuration
**1. Edit the `.env` file**:

```js
DISCORD_TOKEN=your_discord_bot_token
YOUTUBE_API_KEY_1=your_youtube_api_key_1
YOUTUBE_API_KEY_2=your_youtube_api_key_2
YOUTUBE_API_KEY_3=your_youtube_api_key_3
```

**2. Edit the `data.json` file**:

```js
[
  {
    "name":"jukutpremium",
    "youtubeChannelId": "UC_x5XG1OV2P6uZZ5N9YP3e4",
    "discordChannelId": "123456789012345678",
    "roleId": "987654321098765432",
    "profileImg": "https://example.com/profile.jpg",
    "color": "#FF0000"
  }
]
```

## Running the Bot
- After setting up the `.env` and `data.json` files, you can start the bot by running the following command:

```js
node index.js
```

## License
This project is licensed under the MIT License, with the following additional condition:

- If you modify or redistribute this code, you must fork the original repository and include the following statement in your README.md file:

    > "This project is based on code by juktupremium, and modifications were made."

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6&height=200&section=header&text=Jukut.Premium();&fontSize=70&fontAlignY=35" width="100%"/>
</div>
