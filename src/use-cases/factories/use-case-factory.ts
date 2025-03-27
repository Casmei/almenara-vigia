import type BaseUseCase from "../base-use-case";
import GetPagamentosFavorecidosUseCase from "../get-pagamentos-favorecidos";

export type UseCaseType = "pagamentos-favorecidos";

export class UseCaseFactory {
  public static createUseCase(type: UseCaseType): BaseUseCase {
    switch (type) {
      case "pagamentos-favorecidos":
        return new GetPagamentosFavorecidosUseCase();
      default:
        throw new Error(`Tipo de use case não suportado: ${type}`);
    }
  }
}
