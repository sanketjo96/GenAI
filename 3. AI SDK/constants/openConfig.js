import 'dotenv/config';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

export const openai40mini = openai('gpt-4o-mini');
export const openai41 = openai('gpt-4.1');