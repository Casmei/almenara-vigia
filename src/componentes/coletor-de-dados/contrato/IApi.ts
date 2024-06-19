import type { Empenho } from "../tipos/empenhos.type";

export interface IApi {
  gastos(mes: number, ano: number): Promise<Empenho[]>;
}
