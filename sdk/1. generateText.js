import { generateText } from 'ai';
import { openai40mini } from './constants/openConfig.js';

// SDK provides abstraction over the API and interface for the model 
// and helps in easy to use the model. We need to install model specific SDK 
// for the model we are using.
let result;
try {
    result = await generateText({
        model: openai40mini,
        prompt: 'Hi there',
    });
} catch (err) {
    console.error('generateText failed:', err?.message ?? err);
    process.exitCode = 1;
    throw err;
}

console.log(result.text);