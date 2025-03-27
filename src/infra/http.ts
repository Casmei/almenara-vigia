import type { Pagamento } from "../entities";

export async function fetchData(): Promise<Pagamento[]> {
  const url =
    "https://almenara-mg.portaltp.com.br/api/Despesas/GetPagamentosFavorecidos?ano=2025&mes=03";
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  return (await response.json()) as Pagamento[];
}
