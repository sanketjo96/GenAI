import { generateText } from 'ai';
import Fastify from 'fastify';
import { openai40mini } from './constants/openConfig.js';

const fastify = Fastify({ logger: true });

let chatMessages = [
    {
        role: "system",
        content: "You are a smart agent who can answer capital of countries and cities."
    }
]

fastify.post('/api/chat', async (request, reply) => {
    const { query } = request.body;

    chatMessages = [
        ...chatMessages,
        {
            role: "user",
            content: query
        }
    ];

    const result = await generateText({
        model: openai40mini,
        messages: chatMessages
    });

    chatMessages.push(result.response.messages[0])
    console.log(chatMessages);

    reply.send(result.response.messages[0]);
});


/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()