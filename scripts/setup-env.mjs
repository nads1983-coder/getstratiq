import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile } from "node:fs/promises";

const rl = createInterface({ input, output });
try {
  const key = (await rl.question("Paste your OpenAI API key: ")).trim();
  if (!key) {
    console.log("No key entered. .env.local was not changed.");
    process.exit(1);
  }
  const modelAnswer = (await rl.question("OpenAI model [gpt-5]: ")).trim();
  const model = modelAnswer || "gpt-5";
  await writeFile(".env.local", `OPENAI_API_KEY=${key}\nOPENAI_MODEL=${model}\n`, { mode: 0o600 });
  console.log(".env.local was created successfully. The API key was not printed back.");
} finally {
  rl.close();
}
