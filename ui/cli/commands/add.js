import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_COMPONENTS_PATH = path.resolve(__dirname, "../../components");
const TARGET_APP_PATH = process.cwd(); // <- caminho de quem rodou npx

export async function addComponent(componentName) {
  const source = path.resolve(UI_COMPONENTS_PATH, `${componentName}.tsx`);
  const target = path.join(
    TARGET_APP_PATH,
    "components/ui",
    `${componentName}.tsx`
  );

  if (!fs.existsSync(source)) {
    console.log(chalk.red(`❌ Component "${componentName}" not found. `));
    return;
  }

  await fs.ensureDir(path.dirname(target));
  await fs.copy(source, target);

  console.log(
    chalk.green(
      ` Component "${componentName}" paste in: ./components/ui/${componentName}.tsx`
    )
  );
}
