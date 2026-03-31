import { z } from 'zod';
import { casting1, casting2 } from "./sampleinputs/castingmessage.js";
import { openai40mini } from "./constants/openConfig.js";
import { generateText, Output } from 'ai';

const schema = z.object({
    title: z.string().describe('Name of the casting listing from provided text. Its a tile of listing'),
    gender: z.enum(['Male', 'Female']).describe('This should set to gender that casting listing belongs to'),
    agefrom: z.number().describe('Minimum applicent age requirement for this listing.'),
    ageto: z.number().describe('Maximum applicent age requirement for this listing.'),
    location: z.string().describe('City requirement for this listing, This normally should be valid city in world'),
    contact: z.string().describe('Contact number shared with listing to get connected'),
    
    // OpenAI strict JSON schema expects all properties in `required`.
    // Use nullable to represent optional/missing data in structured output.
    url: z.string().nullable().describe('Referance url shared with listing to get connected. This should be valid url, dont create on own. Return null if unavailable.'),
});

const result = await generateText({
    model: openai40mini,
    output: Output.object({
        schema,
        name: 'CastingListing',
        description: 'UnStructured casting listing data extracted from the input text. Optional fields may be omitted.',
    }),
    messages: [
        {
            role: "system",
            content: `You are an expert casting listing parser.
            Do not add explanations or extra fields.
            For required fields, infer the best value from the context.`
        },
        {
            role: "user",
            content: casting1
        }
    ]
});

console.log(result.output);