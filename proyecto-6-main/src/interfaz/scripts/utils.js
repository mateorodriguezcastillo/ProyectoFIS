import Liga from "../../dominio/liga.mjs";
import User from "../../dominio/user.mjs";

export const setTestData = () => {
    let user1Info ={
        'username': 'Pepe','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    let user2Info ={
        'username': 'Juan','aciertosExactos': 1,'aciertosParciales': 0,'errores': 4
    };

    let user3Info ={
        'username': 'Maria','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };
    
    let user4Info ={
        'username': 'Jose','aciertosExactos': 0,'aciertosParciales': 3,'errores': 2
    };

    let user6Info ={
        'username': 'Luis','aciertosExactos': 1,'aciertosParciales': 2,'errores': 2
    };

    let user7Info ={
        'username': 'Luisa','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    let user8Info ={
        'username': 'Pedro','aciertosExactos': 0,'aciertosParciales': 3,'errores': 2
    };

    let user9Info ={
        'username': 'Pablo','aciertosExactos': 2,'aciertosParciales': 1,'errores': 2
    };

    let user11Info ={
        'username': 'Pamela','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    let user12Info ={
        'username': 'Pablonsky','aciertosExactos': 0,'aciertosParciales': 3,'errores': 2
    };

    let user13Info ={
        'username': 'Pabloide','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    let user14Info ={
        'username': 'Pabla','aciertosExactos': 1,'aciertosParciales': 2,'errores': 2
    };

    //Ligas
    let league1Info ={
        'id': 1, 'name': 'Liga Familia','ptsAciertosExactos': 3,'ptsAciertosParciales': 1
    };

    let league2Info ={
        'id': 2, 'name': 'Liga ORT','ptsAciertosExactos': 2,'ptsAciertosParciales': 1
    };

    let league3Info ={
        'id': 3, 'name': 'Liga UDELAR','ptsAciertosExactos': 10,'ptsAciertosParciales': 1
    };

    let user1 = new User(user1Info);
    let user2 = new User(user2Info);
    let user3 = new User(user3Info);
    let user4 = new User(user4Info);
    let user6 = new User(user6Info);
    let user7 = new User(user7Info);
    let user8 = new User(user8Info);
    let user9 = new User(user9Info);
    let user11 = new User(user11Info);
    let user12 = new User(user12Info);
    let user13 = new User(user13Info);
    let user14 = new User(user14Info);

    let league = new Liga(league1Info);
    league.addUser(user1);
    league.addUser(user2);
    league.addUser(user3);
    league.addUser(user4);
    let league2 = new Liga(league2Info);
    league2.addUser(user6);
    league2.addUser(user7);
    league2.addUser(user8);
    league2.addUser(user9);
    let league3 = new Liga(league3Info);
    league3.addUser(user11);
    league3.addUser(user12);
    league3.addUser(user13);
    league3.addUser(user14);

    let leagues = [league, league2, league3];
    let users = [user1, user2, user3, user4, user6, user7, user8, user9, user11, user12, user13, user14];

    return {
        'leagues': leagues,
        'users': users,
    }
}