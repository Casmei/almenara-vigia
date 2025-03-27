import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { mkdir } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class ImageGenerator {
  public async handle(
    htmlFilePath: string,
    options: { outputName: string },
  ): Promise<void> {
    const absoluteHtmlPath = resolve(
      __dirname,
      "../../dist/html",
      htmlFilePath,
    );
    const imagesDir = resolve(__dirname, "../../dist/images");
    const outputPath = resolve(imagesDir, `${options.outputName}.jpeg`);

    console.log(`Iniciando geração de imagem de: ${absoluteHtmlPath}`);
    console.log(`Imagem será salva em: ${outputPath}`);

    // Garante que o diretório de imagens existe
    await mkdir(imagesDir, { recursive: true });

    let browser;
    try {
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 675 });

      await page.goto(`file://${absoluteHtmlPath}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      await page.screenshot({
        path: outputPath,
        fullPage: true,
        type: "jpeg",
      });

      console.log("Imagem PNG gerada com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
