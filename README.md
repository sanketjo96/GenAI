# GenAI Practice Repo

Small playground repo to learn GenAI concepts with the Vercel AI SDK + OpenAI (and some Gemini model swap experiments).

## What this repo covers

- Prompting basics in `1. Prompt/`
- Basic agent flow in `2. Agent/`
- SDK examples in `sdk/`:
  - `1. generateText.js` - simple text generation
  - `2. streamText.js` - streaming output
  - `3. modelswap.js` - swap models/providers
  - `4. history.js` - chat API with message history (Fastify)
  - `5. structureOutput.js` - schema-based structured JSON output
  - `6. classifier.js` - classification with fixed choices
  - `7. imageDescribe.js` - multimodal (text + image) extraction
  - `10. toolcalling.js` - tool calling basics
  - `11. agent.js` - multi-step tool + stop conditions

## Quick setup

1. Install dependencies:
   - `npm install`
2. Create `.env` in project root:
   - `OPEN_API_KEY=your_api_key_here`
3. Run any example:
   - `node ".\\sdk\\1. generateText.js"`
   - `node ".\\sdk\\5. structureOutput.js"`
   - `node ".\\sdk\\11. agent.js"`

## Chat API demo

- Start server:
  - `node ".\\sdk\\4. history.js"`
- In another terminal run client:
  - `node ".\\sdk\\client\\test.js"`

---
This is a learning repo, so scripts are intentionally simple and focused on one concept at a time.
