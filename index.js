import { BeeAgent } from "bee-agent-framework/agents/bee/agent";
import { OllamaChatLLM } from "bee-agent-framework/adapters/ollama/chat";
import { TokenMemory } from "bee-agent-framework/memory/tokenMemory";
import { DuckDuckGoSearchTool } from "bee-agent-framework/tools/search/duckDuckGoSearch";
import { OpenMeteoTool } from "bee-agent-framework/tools/weather/openMeteo";
import { WikipediaTool } from "bee-agent-framework/tools/search/wikipedia";

const llm = new OllamaChatLLM(); // default is llama3.1 (8B), it is recommended to use 70B model

const agent = new BeeAgent({
  llm, // for more explore 'bee-agent-framework/adapters'
  memory: new TokenMemory({ llm }), // for more explore 'bee-agent-framework/memory'
  tools: [new WikipediaTool(), new DuckDuckGoSearchTool(), new OpenMeteoTool()], // for more explore 'bee-agent-framework/tools'
});

const response = await agent
.run({ prompt: "What is the capital of France and what is the current weather there?" })
//.run({ prompt: "What's the current weather in Las Vegas?" })
  .observe((emitter) => {
    emitter.on("update", async ({ data, update, meta }) => {
      console.log(`Agent (${update.key}) 🤖 : `, update.value);
    });
  });

console.log(`Agent 🤖 : `, response.result.text);
