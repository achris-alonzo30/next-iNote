import { OpenAI } from "openai";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";

type ChatParams = {
    messages: Doc<"messages">[];
    messageId: Id<"messages">;
}

export const chat = internalAction({
    handler: async (ctx, { messages, messageId }: ChatParams) => {
        const apiKey = process.env.OPENAI_API_KEY;
        const openai = new OpenAI({apiKey});

        const formattedMessages = messages.map((message) =>({
            role: message.author !== "iNoteAI" ? 
                ("user" as const) 
                : ("assistant" as const),
            content: message.body
        }) )

        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0,
                stream: true,
                messages: [
                    {
                        role: "system",
                        content: `
                        As a knowledgeable and creative writer, your job is to support aspiring writers in their journey.\n
                        Teach and help them to create captivating blog posts, using vivid descriptions and personal tales.\n
                        Encourage and push them to find hidden strength in writing, making their writing intriguing and turn them to a great story teller.\n
                        \n----------------\n
                        In a markdown format, write a story about:
                        \n----------------\n
                        `
                    },
                    ...messages.map(({ body, author}) => ({
                        role: author === "iNoteAI" ? ("assistant" as const) : ("user" as const),
                        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
                        \n----------------\n
                        ${body[0]}` 
                    })),
                ],
            });

            let body = "";
            for await (const part of stream) {
                if (part.choices[0].delta?.content) {
                    body += part.choices[0].delta?.content;
                    // Alternatively you could wait for complete words / sentences.
                    // Here we send an update on every stream message.
                    await ctx.runMutation(internal.messages.update, {
                        messageId,
                        body,
                    }) 
                }
            }
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                console.error(error.status);
                console.error(error.message);
                await ctx.runMutation(internal.messages.update, {
                    messageId,
                    body: `Failed to fetch response: ${error.message}`,
                });
                console.error(error);
            } else {
                throw error;
            }
        }

    }
})