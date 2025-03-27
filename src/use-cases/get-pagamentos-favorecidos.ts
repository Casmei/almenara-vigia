import _ from "lodash";
import type { Pagamento, Favorecido } from "../entities";

export function processData(data: Pagamento[]): Favorecido[] {
  return _.chain(data)
    .groupBy("nome_favorecido")
    .map((items, nome_favorecido) => ({
      nome_favorecido,
      total: _.sumBy(items, "valor"),
      documento_favorecido: items[0]?.documento_favorecido,
    }))
    .orderBy("total", "desc")
    .take(10)
    .value();
}
