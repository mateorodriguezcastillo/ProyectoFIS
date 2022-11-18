export default class User {
	constructor(dataArray) {
		this.username = dataArray['username'];
        this.aciertosExactos = dataArray['aciertosExactos'];//que equipo y con que resultdo (toma en cuenta el empate)
        this.aciertosParciales = dataArray['aciertosParciales'];//que equipo gano
        this.errores = dataArray['errores'];//fallo la prediccion
        // this.ligas = [];
	}

    getUser() {
        return {
            username: this.username,
            aciertosExactos: this.aciertosExactos,
            aciertosParciales: this.aciertosParciales,
            errores: this.errores,
        };
    }

    getAciertosExactos() {
        return this.aciertosExactos;
    }

    getAciertosParciales() {
        return this.aciertosParciales;
    }

    getErrores() {
        return this.errores;
    }   

    // addLiga(liga){
    //     this.ligas.push(liga);
    // }

    // getLigas(){
    //     return this.ligas;
    // }
}