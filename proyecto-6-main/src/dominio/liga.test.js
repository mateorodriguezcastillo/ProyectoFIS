import Liga from './liga.mjs';
import User from './user.mjs';

test('Creacion de una liga', () => {
    let unaLiga = new Liga({'id': 2, 'name': 'ligaTestCreacion', 'ptsAciertosExactos': 10, 'ptsAciertosParciales': 5});
    expect(unaLiga.id).toBe(2);
    expect(unaLiga.name).toBe('ligaTestCreacion');
    expect(unaLiga.ptsAciertosExactos).toBe(10);
    expect(unaLiga.ptsAciertosParciales).toBe(5);
    expect(unaLiga.userList).toStrictEqual([]);
});

const ligaTest = new Liga({'id': 1, 'name': 'ligaTest', 'ptsAciertosExactos': 5, 'ptsAciertosParciales': 2});

test('getLiga Test', () => {
    expect(ligaTest.getLiga()).toStrictEqual({'id': 1, 'name': 'ligaTest', 'ptsAciertosExactos': 5, 'ptsAciertosParciales': 2, 'userList': []});
});

test('get ptsAciertosExactos Test', () => {
    expect(ligaTest.getPtsAciertosExactos()).toBe(5);
});

test('get ptsAciertosParciales', () => {
    expect(ligaTest.getPtsAciertosParciales()).toBe(2);
});

test('get userList Test', () => {
    expect(ligaTest.getUserList()).toStrictEqual([]);
});

const usuarioTest = new User({'username': 'nombreTest1', 'aciertosExactos': 5, 'aciertosParciales': 3, 'errores': 1});
const usuarioTest2 = new User({'username': 'nombreTest2', 'aciertosExactos': 2, 'aciertosParciales': 1, 'errores': 6});

test('addUser Test', () => {
    ligaTest.addUser(usuarioTest2);
    ligaTest.addUser(usuarioTest);
    expect(ligaTest.userList[0]).toStrictEqual(usuarioTest);
    expect(ligaTest.userList[1]).toStrictEqual(usuarioTest2);
});

test('getPuntajeUser Test', () => {
    expect(ligaTest.getPuntajeUser(usuarioTest)).toBe(5*5+2*3);
});