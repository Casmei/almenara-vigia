import puppeteer from "puppeteer";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlDir = `${__dirname}/../html`;

export async function generateImage(): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });
  await page.goto(`file://${htmlDir}/output.html`);
  await page.screenshot({ path: "output.png", fullPage: false });
  await browser.close();
}
