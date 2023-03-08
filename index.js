// import { File } from "./Models/Files";s
import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

const allowedGroups = [-894217890];

export const msgHandler = async (ctx) => {
  if (ctx.chat.type == "group" && !allowedGroups.includes(ctx.chat.id)) {
    await bot.api.leaveChat(ctx.chat.id);
  }
  if (ctx.message.document) {
    try {
      await bot.api.sendMessage(process.env.BOSS, "the file is document");
    } catch (e) {
      console.log(e);
      await bot.api.sendMessage(`failed because of this error: ${e}`);
    }
  }
};

// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new Bot(process.env.TOKEN); // <-- put your authentication token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply(ctx));
// Handle other messages.
bot.on("message", msgHandler);

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
