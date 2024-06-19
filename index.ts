import ColetorDeDados from "./src/componentes/coletor-de-dados/_index";

const gastos = await ColetorDeDados.gastos(6, 2024);

console.log(gastos?.getEmpenhosDoDia());
console.log(gastos?.maiorFavorecido());
console.log(gastos?.somaTotalDeGastos());
