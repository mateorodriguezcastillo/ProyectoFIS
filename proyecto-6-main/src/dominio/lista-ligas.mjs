export default class ListaLigas {

  constructor(arrayDeLigas) {
    this.ligas = arrayDeLigas;
    this.idAAsignar = 4;
  }

  agregar(liga) {
    let ptsAciertoExactoInvalido = liga.ptsAciertosExactos < 0;
    let ptsAciertoParcialInvalido = liga.ptsAciertosParciales < 0;
    let usuariosInvalido = liga.userList.length <= 1;
    if (!ptsAciertoExactoInvalido && !ptsAciertoParcialInvalido && !usuariosInvalido) {
      this.ligas.push(liga);
    } else {
      throw new Error(`No se pudo agregar. Los puntajes deben ser mayores o iguales a 0 y se debe tener por lo menos 2 usuarios agregados`);
    }
  }

  getLigas() {
    return this.ligas;
  }

  getidAAsignar(){
    return this.idAAsignar;
  }

  incrementarId(){
    this.idAAsignar++;
  }

  getLigasDeUsuario(user){
    let arrayLigas = [];
    this.ligas.forEach(liga => {
      let estoyEnLiga = liga.getUserList().some(usuario => usuario.username === user.username);
      if(estoyEnLiga){
        arrayLigas.push(liga);
      }
    });
    return arrayLigas;
  }
}