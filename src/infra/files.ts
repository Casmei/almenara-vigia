import { mkdir, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class HtmlGenerator {
  private htmlDir: string;

  constructor() {
    this.htmlDir = resolve(__dirname, "../../dist/html");
  }

  public async handle(
    html: string,
    options: { fileName: string },
  ): Promise<void> {
    const filePath = resolve(this.htmlDir, `${options.fileName}.html`);

    console.log("Salvando HTML em:", filePath);

    await mkdir(this.htmlDir, { recursive: true });
    await writeFile(filePath, html);
  }
}
