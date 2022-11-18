import ListaLigas from './lista-ligas.mjs';
import Liga from './liga.mjs';
import User from './user.mjs';

test('Creacion de lista de ligas', () => {
    let unaListaLigas = new ListaLigas([]);
    expect(unaListaLigas.ligas).toStrictEqual([]);
    expect(unaListaLigas.idAAsignar).toBe(4);
});

const listaLigasTest = new ListaLigas([]);

test('getLigas test', () => {
    expect(listaLigasTest.getLigas()).toStrictEqual([]);
});

test('getidAAsignar Test', () => {
    expect(listaLigasTest.getidAAsignar()).toBe(4);
});

test('incrementarId Test', () => {
    listaLigasTest.incrementarId();
    expect(listaLigasTest.idAAsignar).toBe(5);
});

const ligaTest = new Liga({'id': 1, 'name': 'ligaTest', 'ptsAciertosExactos': 5, 'ptsAciertosParciales': 2});
const user1 = new User({'username': 'nombreTest1', 'aciertosExactos': 5, 'aciertosParciales': 3, 'errores': 1});
const user2 = new User({'username': 'nombreTest2', 'aciertosExactos': 2, 'aciertosParciales': 1, 'errores': 6});
ligaTest.addUser(user1);

test('agregar liga Test Error', () => {
    const f = () => {
        listaLigasTest.agregar(ligaTest);
    };
    expect(f).toThrow(Error);
});

test('agregar liga Test', () => {
    ligaTest.addUser(user2);
    listaLigasTest.agregar(ligaTest);
    expect(listaLigasTest.ligas[0]).toStrictEqual(ligaTest);
});

test('getLigasDeUsuario Test', () => {
    let user3 = new User({'username': 'nombreTest3', 'aciertosExactos': 3, 'aciertosParciales': 2, 'errores': 4});
    let ligaTest2 = new Liga({'id': 2, 'name': 'ligaTest2', 'ptsAciertosExactos': 6, 'ptsAciertosParciales': 1});
    ligaTest2.addUser(user2);
    ligaTest2.addUser(user3);
    listaLigasTest.agregar(ligaTest2);
    expect(listaLigasTest.getLigasDeUsuario(user3)[0]).toStrictEqual(ligaTest2);
})