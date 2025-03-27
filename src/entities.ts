export interface Pagamento {
  ano: string;
  mes: string;
  unidade_gestora: string;
  data: string;
  especie: string;
  empenho: string;
  liquidacao: string;
  pagamento: string;
  tipo_pagamento: string;
  elemento_despesa: string;
  subtitulo: string;
  funcao: string;
  subfuncao: string;
  programa: string;
  fonte_recurso: string;
  grupo_despesa: string;
  documento_favorecido: string;
  nome_favorecido: string;
  valor: number;
}

export interface Favorecido {
  nome_favorecido: string;
  total: number;
  documento_favorecido: string | undefined;
}
