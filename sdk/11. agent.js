import { generateText, stepCountIs, tool } from "ai";
import z from "zod";
import { openai40mini, openai41 } from "./constants/openConfig.js";


const weatherTool = tool({
    description: 'This tool is to return wether data for passed city',
    inputSchema: z.object({
        city: z.string().describe("City for which wether info needs to pull out")
    }),
    execute: async ({ city }) => {
        return `The wether of city ${city} is 25c and sunny.`;
    }
});

// Please look at the system prompt here. 
// 

// 1. Check even if you ask for city weather it outputs a blank 
// 2. Now add next line to system propmt- "Always respond to user first then call a tool."
// 3. Should see greeting text but no tool results (its called in background)
// 4. Check and debug steps note text and tool_call keys 
// 5. Add stopWhen and now observe

const askQuestion = async (prompt) => {
    return await generateText({
        // stop whens run the model till it reach to final results
        stopWhen: stepCountIs(2),
        model: openai41,
        messages: [
            {
                role: 'system',
                content: `You are helpful greeting assitent who can return wather info of city 
                if user provide city by calling available tool. Always respond to user first then call a tool.`
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        tools: {
            weather: weatherTool
        }
    });

}

// using stopWhen and feeding tool result back to the tool to produce output called Agent

const { text, steps } = await askQuestion('Hi. how are you ? whats the whether of pune ?')
console.log(text)

// console.dir(steps, { depth: null }