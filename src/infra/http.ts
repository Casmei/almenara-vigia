import type { Pagamento } from "../entities";

export default class PortalDaTransparencia {
  private baseUrl: string = "https://almenara-mg.portaltp.com.br/api";

  public async getPagamentosFavorecidos(
    ano: number,
    mes: number,
  ): Promise<Pagamento[]> {
    const params = this.generateDateFilterParams(ano, mes);
    const url = `${this.baseUrl}/Despesas/GetPagamentosFavorecidos?${params}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    return (await response.json()) as Pagamento[];
  }

  private generateDateFilterParams(ano: number, mes: number) {
    return new URLSearchParams({
      ano: ano.toString(),
      mes: mes.toString(),
    }).toString();
  }
}
