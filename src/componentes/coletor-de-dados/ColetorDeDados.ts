import type { IApi } from "./contrato/IApi";
import type { Empenho } from "./tipos/empenhos.type";

export default class ColetorDeDados {
  private buscar: IApi;

  constructor(dataFetcher: IApi) {
    this.buscar = dataFetcher;
  }

  async gastos(mes: number, ano: number, dia?: number): Promise<void> {
    try {
      const empenhos = await this.buscar.gastos(mes, ano);
      const empenhosDoDia = this.getEmpenhosDoDia(empenhos, dia);

      console.log(empenhosDoDia);
    } catch (error) {
      console.error("Erro ao buscar os empenhos favorecidos:", error);
    }
  }

  private getEmpenhosDoDia(empenhos: Empenho[], dia?: number): Empenho[] {
    const diaEscolhido = dia ?? new Date().getDate();

    const empenhosDoDia = empenhos.filter((empenho) => {
      const dataEmpenho = new Date(empenho.data);
      return dataEmpenho.getDate() === diaEscolhido;
    });

    return empenhosDoDia;
  }
}
