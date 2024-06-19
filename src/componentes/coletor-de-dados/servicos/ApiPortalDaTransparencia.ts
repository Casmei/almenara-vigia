import type { IApi } from "../contrato/IApi";
import type { Empenho } from "../tipos/empenhos.type";

export default class ApiPortalDaTransparencia implements IApi {
  async gastos(mes: number, ano: number): Promise<Empenho[]> {
    const url = `https://almenara-mg.portaltp.com.br/api/Despesas/GetEmpenhosFavorecidos?ano=${ano}&mes=${mes}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar os empenhos favorecidos:", error);
      throw error;
    }
  }
}
