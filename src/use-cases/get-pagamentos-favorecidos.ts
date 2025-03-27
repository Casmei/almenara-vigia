import _ from "lodash";
import PortalDaTransparencia from "../infra/http";
import BaseUseCase from "./base-use-case";
import type { Favorecido, Pagamento } from "../entities";

export default class GetPagamentosFavorecidosUseCase extends BaseUseCase<
  Pagamento[],
  Favorecido[]
> {
  constructor() {
    super();
    this.outputBaseName = "pagamentos-favorecidos";
  }

  protected async fetchData(): Promise<Pagamento[]> {
    return await new PortalDaTransparencia().getPagamentosFavorecidos(
      this.currentYear,
      this.currentMonth,
    );
  }

  protected async processData(rawData: Pagamento[]): Promise<Favorecido[]> {
    return Promise.resolve(
      _.chain(rawData)
        .groupBy("nome_favorecido")
        .map((items, nome_favorecido) => ({
          nome_favorecido,
          total: _.sumBy(items, "valor"),
          documento_favorecido: items[0]?.documento_favorecido,
        }))
        .orderBy("total", "desc")
        .take(5)
        .value(),
    );
  }

  protected generateHtmlContent(data: Favorecido[]): string {
    const formatCurrency = (value: number): string => {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
              body {
                margin: 0;
                padding: 0;
                width: 1200px;
                height: 675px;
                font-family: 'Inter', sans-serif;
                background-color: #DC2626;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .container {
                width: 80%;
                text-align: center;
              }

              .title {
                text-align: center;
                margin-bottom: 30px;
              }

              .title h1 {
                margin: 0;
                font-size: 48px;
                color: #ffffff;
                line-height: 1.2;
              }

              .title p {
                margin: 10px 0 0;
                font-size: 20px;
                color: rgba(255,255,255,0.7);
              }

              .favorecidos-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 100%;
              }

              .favorecido-block {
                background-color: rgba(0,0,0,0.2);
                border-radius: 10px;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: transform 0.3s ease;
              }

              .favorecido-block:hover {
                transform: scale(1.02);
              }

              .favorecido-info {
                text-align: left;
              }

              .favorecido-name {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #ffffff;
              }

              .favorecido-doc {
                font-size: 16px;
                color: rgba(255,255,255,0.7);
              }

              .favorecido-value {
                font-size: 28px;
                font-weight: bold;
                color: #4caf50;
                text-align: right;
              }

              .tagline {
                text-align: center;
                margin-top: 30px;
                font-size: 20px;
                color: rgba(255,255,255,0.8);
                max-width: 80%;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="title">
                <h1>TOP 5 FAVORECIDOS</h1>
                <p>Prefeitura Municipal de Almenara • ${this.currentMonth}/${this.currentYear}</p>
              </div>

              <div class="favorecidos-container">
                ${data
                  .slice(0, 5)
                  .map(
                    (item) => `
                  <div class="favorecido-block">
                    <div class="favorecido-info">
                      <div class="favorecido-name">${item.nome_favorecido}</div>
                      <div class="favorecido-doc">${item.documento_favorecido || "Documento não informado"}</div>
                    </div>
                    <div class="favorecido-value">${formatCurrency(item.total)}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>

            </div>
          </body>
        </html>
      `;
  }
}
