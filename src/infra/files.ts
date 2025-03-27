import { mkdir, writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlDir = `${__dirname}/../html`;

export async function saveHTML(html: string): Promise<void> {
  await mkdir(htmlDir, { recursive: true });
  await writeFile(`${htmlDir}/output.html`, html);
}
