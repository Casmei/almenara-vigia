import type { Favorecido } from "../entities";

export function generateHTML(data: Favorecido[]): string {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            width: 1080px;
            height: 1920px;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 1000px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 36px;
            color: #333;
            margin: 0;
          }
          .header p {
            font-size: 18px;
            color: #666;
            margin: 10px 0 0;
          }
          .list {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
          }
          .list-item:last-child {
            border-bottom: none;
          }
          .list-item .name {
            font-size: 20px;
            color: #333;
          }
          .list-item .document {
            font-size: 14px;
            color: #888;
          }
          .list-item .value {
            font-size: 24px;
            font-weight: bold;
            color: #2ecc71;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Top 10 Favorecidos</h1>
            <p>Março de 2025 - Prefeitura Municipal de Almenara</p>
          </div>
          <ul class="list">
            ${data
              .map(
                (item) => `
              <li class="list-item">
                <div>
                  <span class="name">${item.nome_favorecido}</span>
                  <span class="document">${item.documento_favorecido}</span>
                </div>
                <span class="value">R$ ${item.total.toFixed(2)}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
          <div class="footer">
            Dados atualizados em tempo real. Fonte: Portal da Transparência.
          </div>
        </div>
      </body>
    </html>
  `;
}
