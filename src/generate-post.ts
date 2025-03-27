import { UseCaseFactory } from "./use-cases/factories/use-case-factory";
import { ensureDirectoriesExist } from "./utils/ensure-dirs";

export async function generatePost() {
  try {
    await ensureDirectoriesExist();
    const useCase = UseCaseFactory.createUseCase("pagamentos-favorecidos");
    await useCase.handle();
    console.log("Processo concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
    process.exit(1);
  }
}
