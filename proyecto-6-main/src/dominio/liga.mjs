export default class Liga {
	constructor(dataArray) {
        this.id = dataArray['id'];
		this.name = dataArray['name'];
        this.ptsAciertosExactos = dataArray['ptsAciertosExactos'];
        this.ptsAciertosParciales = dataArray['ptsAciertosParciales'];
        this.userList = [];
	}

    getLiga() {
        return {
            id: this.id,
            name: this.name,
            ptsAciertosExactos: this.ptsAciertosExactos,
            ptsAciertosParciales: this.ptsAciertosParciales,
            userList: this.userList,
        };
    }

    getPtsAciertosExactos() {
        return this.ptsAciertosExactos;
    }

    getPtsAciertosParciales() {
        return this.ptsAciertosParciales;
    }

    getUserList() {
        return this.userList;
    }

    addUser(user){
        let ptsAciertosExactos = this.ptsAciertosExactos;
        let ptsAciertosParciales = this.ptsAciertosParciales;
        this.userList.push(user);
        this.userList.sort(function(user1, user2){
            return (user2.getAciertosExactos()*ptsAciertosExactos + user2.getAciertosParciales()*ptsAciertosParciales
            - (user1.getAciertosExactos()*ptsAciertosExactos + user1.getAciertosParciales()*ptsAciertosParciales));
        });
    }

    getPuntajeUser(user){
        return user.getAciertosExactos()*this.ptsAciertosExactos + user.getAciertosParciales()*this.ptsAciertosParciales;
    }
}