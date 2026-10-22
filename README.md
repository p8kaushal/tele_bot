# tele_bot

A lightweight Node.js automation bot that monitors target web pages for changes and dispatches instant alert notifications via Telegram.

---

## Features

- **Automated Web Polling**: Periodically fetches and inspects the HTML content of any specified URL.
- **Diff Detection**: Compares consecutive HTML snapshots in memory to detect content modifications.
- **Instant Telegram Alerts**: Sends a customizable alert message directly to your specified Telegram chat/channel when changes are detected.
- **Configurable Polling Intervals**: Customize polling frequency dynamically via command-line arguments.
- **Zero Heavy Headless Browser Overhead**: Fast and lightweight HTTP fetching using native Node.js `fetch`.

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+ recommended for native `fetch`)
- **Telegram Bot API**: [`node-telegram-bot-api`](https://www.npmjs.com/package/node-telegram-bot-api)
- **Task Scheduling**: [`node-schedule`](https://www.npmjs.com/package/node-schedule)
- **CLI Argument Parsing**: [`minimist`](https://www.npmjs.com/package/minimist)
- **Configuration Management**: [`dotenv`](https://www.npmjs.com/package/dotenv)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- A Telegram account and a Telegram bot created via [@BotFather](https://t.me/BotFather)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/p8kaushal/tele_bot.git
   cd tele_bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```

4. Populate the `.env` file with your credentials:
   ```env
   TELEGRAM_BOT_API_TOKEN=your_bot_token_from_botfather
   TELEGRAM_CHAT_ID=your_telegram_chat_id
   ```

> **How to get your credentials**:
> - **`TELEGRAM_BOT_API_TOKEN`**: Message [@BotFather](https://t.me/BotFather) on Telegram and use `/newbot` to create your bot and obtain the token.
> - **`TELEGRAM_CHAT_ID`**: Send a message to your newly created bot, or use [@userinfobot](https://t.me/userinfobot) / visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` to find your numerical `id`.

---

## Usage

Run `index.js` with the desired command-line flags:

```bash
node index.js -p <URL> [-s <SECONDS>] [-m <MESSAGE>]
```

### CLI Arguments

| Flag | Type | Required | Default | Description |
|---|---|---|---|---|
| `-p` | `string` | **Yes** | — | Target URL to monitor (must be a valid URL starting with `http://` or `https://`). |
| `-s` | `number` | No | `5` | Polling interval in seconds (must be a positive integer). |
| `-m` | `string` | No | `"The target page has been updated!"` | Custom message sent when a page change is detected. |

### Example

Monitor an announcement page every 10 seconds:

```bash
node index.js -p https://example.com/news -s 10 -m "Notice: The example news page has changed!"
```

---

## License

This project is licensed under the [MIT License](LICENSE).
