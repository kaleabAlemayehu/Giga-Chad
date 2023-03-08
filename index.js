import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

const allowedGroups = [-894217890];
const checkIfItBoss = async (ctx) => {
  if (ctx.chat.type == "private" && ctx.chat.id == process.env.BOSS) {
    ctx.reply("hello boss what can i do for you!");
  } else if (ctx.chat.type == "private") {
    ctx.reply("you are not the boss so there is nothing i can do to you!");
  }
};
const msgHandler = async (ctx) => {
  if (ctx.chat.type == "group" && !allowedGroups.includes(ctx.chat.id)) {
    await bot.api.sendMessage(process.env.BOSS, ctx);
    await bot.api.leaveChat(ctx.chat.id);
  }
  if (ctx.message.document) {
    try {
      await ctx.api.sendDocument(
        process.env.BOSS,
        ctx.message.document.file_id
      );
    } catch (e) {
      console.log(e);
      await bot.api.sendMessage(
        process.env.BOSS,
        `failed because of this error: ${e}`
      );
    }
  }
};

// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new Bot(process.env.TOKEN); // <-- put your authentication token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
// Handle other messages.
bot.on("message", msgHandler);
bot.command("start", checkIfItBoss);

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
