const allowedGroups = [-894217890];

export const msgHandler = async (ctx) => {
  if (ctx.chat.type == "group" && !allowedGroups.includes(ctx.chat.id)) {
    await bot.api.leaveChat(ctx.chat.id);
  }
  if (ctx.message.document) {
  }
};
