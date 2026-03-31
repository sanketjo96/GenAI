import fs from 'node:fs';
import path from 'node:path';
import { generateText, Output } from "ai";
import { openai40mini } from "./constants/openConfig.js";
import z from 'zod';
import { casting1, casting2 } from './sampleinputs/castingmessage.js';

const schema = z.object({
    description: z.string().describe('Infered description of image from smart AI casting analyzer'),
    castingProbablity: z.number().describe('This is casting closeness percentage'),
});

const getFileData = (halfpath) => {
    return fs.readFileSync(path.join(import.meta.dirname, halfpath));
}


try {
    const result = await generateText({
        model: openai40mini,
        output: Output.object({
            schema,
            name: 'CastingListingScore',
            description: 'Information about casting listing and image'
        }),
        messages: [
            {
                role: 'system',
                content: `You are smart AI casting analyzer who reads user image and casting text 
                    compute matching percentage. You need to judge applicant image by afce, color complexion and 
                    body type ignore everything else (attire, background and accessaries). It should return casting probablity score and image description as a reasoning to score
                    
                    If applicent is perfect matched score should be 100. If applicent is not mtaching 
                    at all score should be 0. Strictly ignore attire, background and accessaries 
                `
            },
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: casting1
                    },
                    {
                        type: 'image',
                        image: getFileData('/source/applicant5.png')
                    }
                ]
            }
        ]
    });
    console.log(result.output)
} catch (e) {
    console.log(e)
}


