import type { Pagamento, Favorecido } from "./entities";
import { processData } from "./use-cases/get-pagamentos-favorecidos";
import { fetchData } from "./infra/http";
import { saveHTML } from "./infra/files";
import { generateImage } from "./infra/puppeteer";
import { generateHTML } from "./infra/templates";

export async function generatePost() {
  try {
    // // Busca os dados
    const data: Pagamento[] = await fetchData();
    // // Processa os dados
    const processedData: Favorecido[] = processData(data);
    // // Gera um HTML com os dados
    const html: string = generateHTML(processedData);
    // // Salva um HTML com os dados
    await saveHTML(html);
    // // Gera imagem com base no HTML
    await generateImage();
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
  }
}
