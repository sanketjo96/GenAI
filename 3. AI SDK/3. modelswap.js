import { streamText } from 'ai';
import { openai40mini } from './constants/openConfig.js';
import { googleAI } from './constants/geminiConfig.js';

const ask = async (
    model,
    messages
) => {
    const { textStream } = await streamText({
        model,
        messages
    });
    for await (const chunk of textStream) {
        process.stdout.write(chunk);
    }
}

ask(openai40mini, [
    {
        role: 'user',
        content: 'What is the capital of France?'
    }
]);
