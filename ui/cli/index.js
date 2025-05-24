#!/usr/bin/env node
import { argv } from "process";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const command = argv[2];

async function run() {
  switch (command) {
    case "init":
      const initPath = join(__dirname, "commands", "init.js")
      const { runInit } = await import(`file://${initPath}`)
      await runInit()
      break;
    case "add":
      const component = argv[3];
      if (!component) {
        console.error("🚨 Especifique um componente: toons-ui add button");
        process.exit(1);
      }
      const addPath = join(__dirname, "commands", "add.js");
      const { addComponent } = await import(`file://${addPath}`);
      await addComponent(component);
      break;

    default:
      console.log("Comando não reconhecido. Try: npx toons-ui add <componente>");
  }
}

run();
