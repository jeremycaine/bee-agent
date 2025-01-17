import "dotenv/config";
import { UnconstrainedMemory } from "bee-agent-framework/memory/unconstrainedMemory";
import { OpenMeteoTool } from "bee-agent-framework/tools/weather/openMeteo";
import { WikipediaTool } from "bee-agent-framework/tools/search/wikipedia";
import { DuckDuckGoSearchTool } from "bee-agent-framework/tools/search/duckDuckGoSearch";
import { AgentWorkflow } from "bee-agent-framework/experimental/workflows/agent";
import { BaseMessage, Role } from "bee-agent-framework/llms/primitives/message";
import { OllamaChatLLM } from "bee-agent-framework/adapters/ollama/chat";

const workflow = new AgentWorkflow();
const llm = new OllamaChatLLM(); // default is llama3.1 (8B), it is recommended to use 70B model

workflow.addAgent({
  name: "Search",
  instructions: "You are a search assistant. Respond only if you can provide a useful answer.",
  tools: [new DuckDuckGoSearchTool()],
  llm: llm,
});

workflow.addAgent({
  name: "WeatherForecaster",
  instructions: "You are a weather assistant. Respond only if you can provide a useful answer.",
  tools: [new OpenMeteoTool()],
  llm: llm,
  execution: { maxIterations: 3 },
});

workflow.addAgent({
  name: "Solver",
  instructions:
    "Your task is to provide the most useful final answer based on the assistants' responses which all are relevant. Ignore those where assistant do not know.",
  llm: llm,
});

const memory = new UnconstrainedMemory();

await memory.add(
  BaseMessage.of({
    role: Role.USER,
    text: "What is the capital of Germany and what is the current weather there?",
    meta: { createdAt: new Date() },
  }),
);

const { result } = await workflow.run(memory.messages).observe((emitter) => {
  emitter.on("success", (data) => {
    console.log(`-> ${data.step}`, data.response?.update?.finalAnswer ?? "-");
  });
});

console.log(`Agent 🤖`, result.finalAnswer);
