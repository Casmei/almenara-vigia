import type { IApi } from "./contrato/IApi";
import type { Empenho } from "./tipos/empenhos.type";
import _ from "lodash";

export default class ColetorDeDados {
  private buscar: IApi;
  private empenhos: Empenho[] | null = null;
  private diaDaBusca: number = new Date().getDate();

  constructor(dataFetcher: IApi) {
    this.buscar = dataFetcher;
  }

  async gastos(mes: number, ano: number, dia?: number) {
    try {
      const empenhos = await this.buscar.gastos(mes, ano);
      this.empenhos = empenhos;

      if (dia) this.diaDaBusca = dia;

      return this;
    } catch (error) {
      console.error("Erro ao buscar os empenhos favorecidos:", error);
    }
  }

  public getEmpenhosDoDia(dia?: number) {
    const diaEscolhido = dia ?? this.diaDaBusca;

    const empenhosDoDia = this.empenhos?.filter((empenho) => {
      const dataEmpenho = new Date(empenho.data);
      return dataEmpenho.getDate() === diaEscolhido;
    });

    return empenhosDoDia;
  }

  public somaTotalDeGastos() {
    return this.empenhos?.reduce((soma, empenho) => {
      return soma + empenho.valor;
    }, 0);
  }

  public maiorFavorecido() {
    return _.chain(this.empenhos)
      .groupBy("nome_favorecido")
      .map((items, chave) => ({
        nome: chave,
        cpf: items[0].documento_favorecido,
        valor: _.sumBy(items, "valor"),
      }))
      .orderBy("valor", "desc")
      .value();
  }
}
