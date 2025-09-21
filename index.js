const minimist = require("minimist")
const schedule = require("node-schedule")
const TelegramBot = require("node-telegram-bot-api")
require("dotenv").config()

// Credentials required to connect to the Telegram bot
const TELEGRAM_BOT_API_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Parse the command-line arguments
const argv = minimist(process.argv.slice(2))

// Access the command-line options
const pageUrl = argv["p"]
const seconds = argv["s"] !== undefined ? argv["s"] : 5
const message = argv["m"] !== undefined ? argv["m"] : "The target page has been updated!"

// Check if pageUrl is present
if (pageUrl === undefined) {
  console.error("-p argument must be set")
  process.exit(9)
}

// Check if pageUrl contains a valid URL
try {
  // It raises an exception
  // If the input string is not a valid URL
  new URL(pageUrl)
} catch (e) {
  console.error("-p argument must be a valid URL")
  process.exit(9)
}

// Check if seconds contains a positive integer
if (!(Number.isInteger(seconds) && seconds > 0)) {
  console.error("-s argument must be a positive integer")
  process.exit(9)
}

// Check if the message contains a nonempty and nonblank string
if (typeof message !== "string" || message.trim() === "") {
  console.error("-m argument cannot be empy or blank")
  process.exit(9)
}

// Initialize a Telegram Bot API client
const bot = new TelegramBot(TELEGRAM_BOT_API_TOKEN)

// Where to store the HTML of the target page
// retrieved in the previous iteration
let oldHTML = undefined

async function notifyPageChange(url, message) {
  console.log(`Connecting to ${url}...`)

  // Perform an HTTP GET request to the page URL
  const response = await fetch(url)
  // Access the HTML content returned by the server
  const html = await response.text()

  console.log("Page HTML retrieved succesfully")

  // If the page content has changed
  if (html !== oldHTML) {
    console.log("Page change detected!")

    // Try notifying about the page change
    // with a Telegram message
    try {
      console.log("Sending the notification message to Telegram...")
      // Send a Telegram message to the specified chat
      await bot.sendMessage(TELEGRAM_CHAT_ID, message)
      console.log("Telegram message sent succesfully!")
    } catch (error) {
      console.error("Sending the Telegram message failed with error:", error)
    }

    // Keep track of the current HTML content
    oldHTML = html
  } else {
    console.log("No page changes!")
  }
}

// Schedule the page change detection task
// to run every "-s" seconds
schedule.scheduleJob(`*/${seconds} * * * * *`, async () => {
  console.log(`[${new Date().toISOString()}] New iteration started`)
  await notifyPageChange(pageUrl, message)
  console.log(`[${new Date().toISOString()}] Iteration completed\n`)
})