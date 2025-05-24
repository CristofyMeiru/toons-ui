import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { execSync } from "child_process";
import chalk from "chalk";

function detectPackageManager() {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";
  return "npm"; // fallback
}

async function askPackageManager(defaultPkgManager) {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "pkgManager",
      message: "Which package manager would you like to use?",
      choices: ["npm", "yarn", "pnpm"],
      default: defaultPkgManager,
    },
  ]);
  return answers.pkgManager;
}

function installDependencies(pkgManager, packages) {
  let installCmd;

  switch (pkgManager) {
    case "pnpm":
      installCmd = `pnpm add ${packages.join(" ")}`;
      break;
    case "yarn":
      installCmd = `yarn add ${packages.join(" ")}`;
      break;
    case "npm":
    default:
      installCmd = `npm install ${packages.join(" ")}`;
  }

  console.log(chalk.cyan(`Running: ${installCmd}`));
  execSync(installCmd, { stdio: "inherit" });
}

export async function runInit() {
  console.log(chalk.cyan("\n🔧 Toons UI Setup\n"));

  const defaultPkgManager = detectPackageManager();
  const chosenPkgManager = await askPackageManager(defaultPkgManager);

  try {
    installDependencies(chosenPkgManager, ["nativewind", "tailwindcss"]);
    console.log(chalk.green("\n✅ Dependencies installed successfully!\n"));
  } catch (error) {
    console.log(chalk.red("\n❌ Failed to install dependencies:\n"), error);
  }
}
