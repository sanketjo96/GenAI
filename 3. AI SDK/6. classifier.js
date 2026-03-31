import { generateText, Output } from "ai";
import { openai40mini } from "./constants/openConfig.js";


const { output } = await generateText({
    model: openai40mini,
    output: Output.choice({
       options: ["Positive", "Negative", "Nutral"],   
    }), 
    messages: [
        {
            role: "system",
            content: "You are smart AI assitent who can classify centients based on positive, negative and nutral"
        }, 
        {
            role: "user",
            content: "I am nurvous a boy"            
        }
    ]
});

console.log(output)