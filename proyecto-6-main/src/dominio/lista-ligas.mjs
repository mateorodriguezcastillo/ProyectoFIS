export default class ListaLigas {

    constructor() {
      this.ligas = [];
    }
  
    agregar(liga) {
      let ligaEnCartelera = this.ligas.some(l => l.titulo == liga.titulo);
      if (!ligaEnCartelera) {
        this.ligas.push(liga);
      } else {
        throw new Error(`No se pudo agregar. ${liga.titulo} ya se encuentra en cartelera.`);
      }
    }
  
    getLigas() {
      return this.ligas;
    }
  }