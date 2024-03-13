
import { OpenAI } from "@langchain/openai";
import { internal } from "./_generated/api";
import { LLMChain } from "langchain/chains";
import { Doc, Id } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationSummaryBufferMemory } from "langchain/memory";

type ChatParams = {
    messages: Doc<"messages">[];
    messageId: Id<"messages">;
}

export const chat = internalAction({
    handler: async (ctx, { messages, messageId }: ChatParams) => {
        const llm = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo", maxTokens: 1000  });
        const memory = new ConversationSummaryBufferMemory({
            memoryKey: "chat_history",
            llm,
            maxTokenLimit: 100
          });

        const promptTemplate = `
        As a knowledgeable and creative writer, your job is to support aspiring writers in their journey.\n
        Teach and help them to create captivating blog posts, using vivid descriptions and personal tales.\n
        Encourage and push them to find hidden strength in writing, making their writing intriguing and turn them to a great story teller.\n
        \n----------------\n
        In a markdown format, write a story about:
        \n----------------\n
        `;

        const prompt = PromptTemplate.fromTemplate(
            `
                ${promptTemplate}\n\n

                \n----------------\n
                CURRENT CONVERSATION: \n
                {chat_history} \n\n

                Use this current conversation as a memory to help you to remember what you and user talked about so you can answer the user next question. \n\n

                \n----------------\n
                USER'S QUESTION: \n
                {input}
                \n----------------\n
            `)
        const chain = new LLMChain({llm, prompt, memory})

        const response = await chain.invoke({ input: messages[0].body })

        if (response) {
            await ctx.runMutation(internal.messages.update, {
                messageId, 
                body: response.text
            })
        }
 
    }
})