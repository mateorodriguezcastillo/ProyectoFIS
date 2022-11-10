import Liga from "../../dominio/liga.mjs";
import User from "../../dominio/user.mjs";

export const setTestData = () => {
    let user1Info ={
        'username': 'Pepe','aciertosExactos': 0,'aciertosParciales': 0,'errores': 5
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

    let user5Info ={
        'username': 'Ana','aciertosExactos': 2,'aciertosParciales': 1,'errores': 2
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

    let user10Info ={
        'username': 'Paula','aciertosExactos': 1,'aciertosParciales': 2,'errores': 2
    };

    let user11Info ={
        'username': 'Pamela','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    let user12Info ={
        'username': 'Pablo','aciertosExactos': 0,'aciertosParciales': 3,'errores': 2
    };

    let user13Info ={
        'username': 'Pablo','aciertosExactos': 2,'aciertosParciales': 1,'errores': 2
    };

    let user14Info ={
        'username': 'Pablo','aciertosExactos': 1,'aciertosParciales': 2,'errores': 2
    };

    let user15Info ={
        'username': 'Pablo','aciertosExactos': 3,'aciertosParciales': 0,'errores': 2
    };

    //Ligas
    let league1Info ={
        'name': 'Liga 1','ptsAciertosExactos': 3,'ptsAciertosParciales': 1
    };

    let league2Info ={
        'name': 'Liga 2','ptsAciertosExactos': 2,'ptsAciertosParciales': 1
    };

    let league3Info ={
        'name': 'Liga 3','ptsAciertosExactos': 5,'ptsAciertosParciales': 2
    };

    let user1 = new User(user1Info);
    let user2 = new User(user2Info);
    let user3 = new User(user3Info);
    let user4 = new User(user4Info);
    let user5 = new User(user5Info);
    let user6 = new User(user6Info);
    let user7 = new User(user7Info);
    let user8 = new User(user8Info);
    let user9 = new User(user9Info);
    let user10 = new User(user10Info);
    let user11 = new User(user11Info);
    let user12 = new User(user12Info);
    let user13 = new User(user13Info);
    let user14 = new User(user14Info);
    let user15 = new User(user15Info);

    let league = new Liga(league1Info);
    league.addUser(user1);
    user1.addLiga(league.getLigaSinUsers())
    league.addUser(user2);
    user2.addLiga(league.getLigaSinUsers())
    league.addUser(user3);
    user3.addLiga(league.getLigaSinUsers())
    league.addUser(user4);
    user4.addLiga(league.getLigaSinUsers())
    league.addUser(user5);
    user5.addLiga(league.getLigaSinUsers())
    let league2 = new Liga(league2Info);
    league2.addUser(user6);
    user6.addLiga(league2.getLigaSinUsers())
    league2.addUser(user7);
    user7.addLiga(league2.getLigaSinUsers())
    league2.addUser(user8);
    user8.addLiga(league2.getLigaSinUsers())
    league2.addUser(user9);
    user9.addLiga(league2.getLigaSinUsers())
    league2.addUser(user10);
    user10.addLiga(league2.getLigaSinUsers())
    let league3 = new Liga(league3Info);
    league3.addUser(user11);
    user11.addLiga(league3.getLigaSinUsers())
    league3.addUser(user12);
    user12.addLiga(league3.getLigaSinUsers())
    league3.addUser(user13);
    user13.addLiga(league3.getLigaSinUsers())
    league3.addUser(user14);
    user14.addLiga(league3.getLigaSinUsers())
    league3.addUser(user15);
    user15.addLiga(league3.getLigaSinUsers());

    let leagues = [league, league2, league3];
    let users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15];

    return [leagues, user1, users];
}