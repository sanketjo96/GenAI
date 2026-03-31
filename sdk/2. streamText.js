import { streamText } from 'ai';
import { openai40mini } from './constants/openConfig.js';

// streamText is a function that streams the text from the model.
// best way for user expiriance
const { textStream } = await streamText({
    model: openai40mini,
    messages: [
        {
            role: 'system',
            content: 'You are a storyteller. You are going to tell me a story in 100 words.',
        },
        {
            role: 'user',
            content: 'Tell me some indian story',
        }
    ]
});

for await (const chunk of textStream) {
    process.stdout.write(chunk);
}
