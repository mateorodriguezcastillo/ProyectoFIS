export default class Liga {
	constructor(dataArray) {
        this.id = dataArray['id'];
		this.name = dataArray['name'];
        this.ptsAciertosExactos = dataArray['ptsAciertosExactos'];
        this.ptsAciertosParciales = dataArray['ptsAciertosParciales'];
        this.userList = [];
	}

    //function that get Liga data
    getLiga() {
        return {
            id: this.id,
            name: this.name,
            ptsAciertosExactos: this.ptsAciertosExactos,
            ptsAciertosParciales: this.ptsAciertosParciales,
            userList: this.userList,
        };
    }

    getLigaSinUsers() {
        return {
            id: this.id,
            name: this.name,
            ptsAciertosExactos: this.ptsAciertosExactos,
            ptsAciertosParciales: this.ptsAciertosParciales,
        }
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
        this.userList.push(user);
    }
}
