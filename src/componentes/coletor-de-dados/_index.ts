import ColetorDeDados from "./ColetorDeDados";
import ApiPortalDaTransparencia from "./servicos/ApiPortalDaTransparencia";

const coletorDeDados = new ColetorDeDados(new ApiPortalDaTransparencia());
export default coletorDeDados;
