import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();
//-894217890 testgroup
// -1001763257854 testSupergroup
// -1001719821555 bit group
const allowedGroups = [-1001719821555, -894217890, -1001763257854];
const checkIfItBoss = async (ctx) => {
  if (ctx.chat.type == "private" && ctx.chat.id == process.env.BOSS) {
    await ctx.reply("hello boss what can i do for you!");
  } else if (ctx.chat.type == "private") {
    await ctx.reply(
      "you are not the boss so there is nothing i can do to you!"
    );
    await bot.api.sendMessage(process.env.BOSS, ctx);
  }
};
const msgHandler = async (ctx) => {
  if (ctx.chat.type !== "private" && !allowedGroups.includes(ctx.chat.id)) {
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
bot.command("start", checkIfItBoss);
bot.on("message", msgHandler);

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
// Start the server
bot.start();
