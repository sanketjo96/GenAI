import { generateText, tool } from "ai";
import z from "zod";
import { openai40mini } from "./constants/openConfig.js";


const logTool = tool({
    description: 'This tool is to log any data to console of host system',
    inputSchema: z.object({
        message: z.string().describe("The message to log on console")
    }),
    execute: async ({ message }) => {
        console.log(message)    
    }
});

const result = await generateText({
    model: openai40mini,
    messages: [
        {
            role: 'user',
            content: ' Log hi to system console',
        },
        {
            role: 'system',
            content: 'You are helpful assitent which can answer to user and log user message to console'
        }
    ],
    tools: {
        log: logTool
    }
});

console.log(result.steps[0].toolCalls);
console.log(result.steps[0].toolResults);