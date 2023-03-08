// import { File } from "./Models/Files";

const allowedGroups = [-894217890];

export const msgHandler = async (ctx) => {
  if (ctx.chat.type == "group" && !allowedGroups.includes(ctx.chat.id)) {
    await bot.api.leaveChat(ctx.chat.id);
  }
  if (ctx.message.document) {
    const newFile = new File({
      fileName: ctx.message.document.file_name,
      fileType: ctx.message.document.mime_type,
      caption: ctx.message.caption,
      fileId: ctx.message.document.fileId,
      thumbId: ctx.message.document.thumb.fileId,
    });
  }
};
