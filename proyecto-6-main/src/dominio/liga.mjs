export default class Liga {
	constructor(dataArray) {
		this.name = dataArray['name'];
        this.ptsAciertosExactos = dataArray['ptsAciertosExactos'];
        this.ptsAciertosParciales = dataArray['ptsAciertosParciales'];
        this.userList = [];
	}

    //function that get Liga data
    getLiga() {
        return {
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
        this.userList.push(user);
    }
}
