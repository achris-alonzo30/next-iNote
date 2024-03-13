import { v } from "convex/values";
import { internal } from "./_generated/api";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { internalMutation, mutation } from "./_generated/server";

export const list = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }): Promise<Doc<"messages">[]> => {
    const messages =  await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .order("desc")
      .take(100);

    return messages.reverse();
  },
});

export const send = mutation({
  args: {
    body: v.string(),
    author: v.string(),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, { body, author, sessionId }) => {
    await ctx.db.insert("messages", {
      body,
      author,
      sessionId,
    });

    if (body) {
      // Fetch the latest n messages to send as context.
      // The default order is by creation time.
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
        .take(10);
      console.log(messages)
      messages.reverse();  
      const messageId = await ctx.db.insert("messages", {
        author: "iNoteAI",
        body: "...",
        sessionId,
      });

      // Schedule an action that calls ChatGPT updates the message.
      await ctx.scheduler.runAfter(0, internal.openai.chat, {
        messages,
        messageId,
      });
    }
  },
});

export const update = internalMutation({
  args: {
    body: v.string(),
    messageId: v.id("messages"),
  },
  handler: async (ctx, { messageId, body }) => {
    await ctx.db.patch(messageId, { body });
  },
});

export const clear = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});
