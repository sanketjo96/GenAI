import 'dotenv/config';
import OpenAI from 'openai';
import PromptSync from 'prompt-sync';

const client = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

/**
 * Zero shot prompting is just giving instructions directly to model without
 * prior examples.
 */

const directsystemprompt = "You are math expert and answer only queries related to math for everything else just say sorry i cant answer"
const zeroShotResponse = await client.responses.create({
    model: "gpt-5.4",
    input: [
        { "role": "system", content: directsystemprompt },
        { "role": "user", content: "whar is 2 + 2 ?" }
    ]
});


/**
 * few shot prompting is just giving instructions along with proper examples.
 * More examples means more accuracy
 */
const fewshotsystemprompt = `You are math expert. You need to answer only queries related to math for everything else just say sorry i cant answer
Examples
Q: Can you explain US-Iran war
A: Sorry I cant answer that

Q: What is 2+5/2 and why ?
A: Answer is 4.5 and not 3.5 becuse division takes precedance in calculation 
`
const fewShotResponse = await client.responses.create({
    model: "gpt-5.4",
    input: [
        { "role": "system", content: fewshotsystemprompt },
        { "role": "user", content: "what is 3*3+2/2 and why ?" }
    ]
});


/**
 * Structured few shot prompting is just giving instructions along with proper examples.
 * More examples means more accuracy
 */
const structuredFewshotSystemprompt = `You are math expert. You need to answer only queries related to math for everything else just say sorry i cant answer
Rules:
    - Strictly follow JSON response format

Output Format: 
    - [{   
        "result": "10",
        "description": "some text here"
    }]

Examples:
Q: Can you explain US-Iran war
A: [{"result": null}]

Q: What is 2+5/2 and why ?
A: [{"result": "4.5", "description": "Answer is 4.5 and not 3.5 becuse division takes precedance in calculation "}]
`
const structuredFewshotResponse = await client.responses.create({
    model: "gpt-5.4",
    input: [
        { "role": "system", content: structuredFewshotSystemprompt },
        { "role": "user", content: "what is 3*3+2/2 and why ?" }
    ]
});

/**
 * Chain of thoughts (CoT) 
 * Encouraging the model to generate intermediate reasoning steps before arriving at the final answe
 */

const coTSystemprompt = `You are math expert. You need to answer only queries related to math for everything else just say sorry i cant answer

Rules:
    - Before generating final output, thik about problem and make a plan before arriving to final response.
    - Need step by step output
    - Steps and Sequence of steps is - START (look at the use input and gave a initial understanding about problem or what needs to be done), Next PLAN (to plan process of getting to the response, could be multiple planning steps) finally RESULT (where it should output final outcome)
    - Strictly generate, Only one step at a time. Dont need all steps till results in one shot

Output Format: 
    - [{   
        "step": "START | PLAN | RESULT",
        "description": "some text here"
    }]

Examples:
Q: Can you calculate 2*3/3 ?
A:  START: [{   "step": "START",
        "description": "Looks like simple mathematical calculation with natural numbers"
    }]
    PLAN: [{   
        "step": "PLAN",
        "description": "It appears that I need to use BODMAS to calculate final result here"
    }]
    PLAN: [{   
        "step": "PLAN",
        "description": "Yes, BODMAS is way here. First calculate division 3/3 = 1"
    }]
    PLAN: [{   
        "step": "PLAN",
        "description": "Then pick fragment 2*1 = 2"
    }]
    RESULT: [{   
        "step": "RESULT",
        "description": "Final result is 2"
    }]
`
// Note how it generate next step. And usage of assitance role to jumpt to
// next step
const coTResponse = await client.responses.create({
    model: "gpt-5.4",
    input: [
        { "role": "system", content: coTSystemprompt },
        { "role": "user", content: "what is 30*1+2/2" },
        { "role": "assistant", content: '[{"step": "START", "description": "This is a basic arithmetic expression: 30*1+2/2"}]' }
    ]
});

// Auto generation of CoT
const prompt = PromptSync();
const userInput = prompt("Enter your question - ");
console.log("Question", userInput)
let res = null;

while (true) {
    let assistantContent;

    if (res && res[0] && ['START', 'PLAN'].includes(res[0].step)) {
        assistantContent = JSON.stringify(res)
    } else if (res && res[0] && ['RESULT'].includes(res[0].step)) {
        break;
    }

    let autoCoTResponse = await client.responses.create({
        model: "gpt-5.4",
        input: [
            { "role": "system", content: coTSystemprompt },
            { "role": "user", content: userInput },
            ...(!!assistantContent 
                ? [{ "role": "assistant", content: assistantContent }] 
                : [])
        ]
    });

    const output = JSON.parse(autoCoTResponse.output_text);
    console.log(output)
    res = output;
}