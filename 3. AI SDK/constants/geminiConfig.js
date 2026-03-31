import 'dotenv/config';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const gemini = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const googleAI = gemini('gemini-2.5-flash');