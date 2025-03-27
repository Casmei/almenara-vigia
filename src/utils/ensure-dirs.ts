import { mkdir } from "fs/promises";
import { resolve, dirname as pathDirname } from "path";
import { fileURLToPath } from "url";

const __dirname = pathDirname(fileURLToPath(import.meta.url));

export async function ensureDirectoriesExist() {
  const directories = [
    resolve(__dirname, "../../dist/html"),
    resolve(__dirname, "../../dist/images"),
  ];

  for (const dir of directories) {
    await mkdir(dir, { recursive: true });
    console.log(`Diretório verificado/criado: ${dir}`);
  }
}
