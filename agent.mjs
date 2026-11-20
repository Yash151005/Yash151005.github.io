
import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Only two models
const models = [
  {
    name: "Claude Fable 5.2",
    id: "claude-fable-5-2"
  },
  {
    name: "Claude Opus 5.5",
    id: "claude-opus-5-5"
  }
];

let selectedModel = models[0].id;

function showModels() {
  console.log("\nAVAILABLE CLAUDE MODELS");
  console.log("-----------------------");

  models.forEach((model, index) => {
    console.log(`${index + 1}. ${model.name}`);
  });
}

async function changeModel() {
  showModels();

  const choice = await rl.question(
    "\nSelect model (1 or 2): "
  );

  const index = Number(choice) - 1;

  if (models[index]) {
    selectedModel = models[index].id;
    console.log(`\nModel changed to: ${models[index].name}`);
  } else {
    console.log("\nInvalid selection. Model unchanged.");
  }
}

async function runAgent(task) {
  console.log(`\nClaude is working...`);
  console.log(`Model: ${selectedModel}\n`);

  try {
    for await (const message of query({
      prompt: task,
      options: {
        model: selectedModel,
        cwd: process.cwd(),

        allowedTools: [
          "Read",
          "Write",
          "Edit",
          "Bash",
          "WebSearch",
          "WebFetch"
        ],

        permissionMode: "acceptEdits"
      }
    })) {
      if (message.type === "assistant") {
        for (const block of message.message.content) {
          if (block.type === "text") {
            console.log(block.text);
          }
        }
      }
    }

    console.log("\nTask completed.");
  } catch (error) {
    console.error("\nError:", error.message);
  }
}

async function main() {
  console.log("\n================================");
  console.log("      CLAUDE CODING AGENT");
  console.log("================================");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("\nAPI key not found!");
    console.log("Set ANTHROPIC_API_KEY before starting.");
    return;
  }

  // Initial model selection
  showModels();

  const choice = await rl.question(
    "\nSelect your model (1 or 2): "
  );

  const index = Number(choice) - 1;

  if (!models[index]) {
    console.log("Invalid model selection.");
    return;
  }

  selectedModel = models[index].id;

  console.log(`\nSelected: ${models[index].name}`);
  console.log("\nCoding agent is ready!");

  console.log("\nCOMMANDS:");
  console.log("/model   - Change Claude model");
  console.log("/models  - Show available models");
  console.log("/current - Show current model");
  console.log("exit     - Exit agent");

  // Chat loop
  while (true) {
    const task = await rl.question("\nYou: ");
    const command = task.trim().toLowerCase();

    if (command === "exit") {
      console.log("\nClaude Coding Agent closed.");
      break;
    }

    if (command === "/models") {
      showModels();
      continue;
    }

    if (command === "/current") {
      const current = models.find(
        model => model.id === selectedModel
      );

      console.log(
        "\nCurrent model:",
        current?.name || selectedModel
      );

      continue;
    }

    if (command === "/model") {
      await changeModel();
      continue;
    }

    if (!task.trim()) continue;

    await runAgent(task);
  }

  rl.close();
}

main().catch(error => {
  console.error("Agent error:", error);
  rl.close();
});
