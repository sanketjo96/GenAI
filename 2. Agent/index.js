import OpenAI from "openai";
import PromptSync from 'prompt-sync';
import 'dotenv/config';
import { systemPrompt } from "./promt.js";
import { toolMap } from "./constants.js";

const client = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const prompt = PromptSync();
const userInput = prompt("Enter your question - ");
const input_history = [
    { "role": "system", content: systemPrompt },
    { "role": "user", content: userInput },
]

while (true) {
    let llmRes = await client.chat.completions.create({
        model: "gpt-5.4",
        messages: input_history
    });

    const response = JSON.parse(llmRes.choices[0].message.content);
    input_history.push(llmRes.choices[0].message)
    console.log(response)

    if (response.step === 'TOOL') {
        const toolName = response['tool_name'];
        const tool = toolMap[toolName];
        try {
            const tool_res = await tool(response.input);
            input_history.push({
                role: "developer",
                content: JSON.stringify({
                    step: "OBSERVE",
                    TOOL_NAME: "getWetherInfoByCity",
                    input: response.input,
                    output: tool_res
                }),
            });
        } catch (e) {
            console.log('error in tool calling', e)
        } finally {
            continue;
        }
    }

    if (response.step === 'RESULT') {
        break;
    }
}