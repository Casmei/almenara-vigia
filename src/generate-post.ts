import GetPagamentosFavorecidosUseCase from "./use-cases/get-pagamentos-favorecidos";
import { ensureDirectoriesExist } from "./utils/ensure-dirs";

export async function generatePost() {
  try {
    await ensureDirectoriesExist();
    const useCase = new GetPagamentosFavorecidosUseCase();
    await useCase.handle();
    console.log("Processo concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
    process.exit(1);
  }
}
