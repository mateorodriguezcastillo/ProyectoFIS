// import { expect } from 'expect';
// import { test } from 'picomatch';
import User from './user.mjs';

test('Creacion de un User', () => {
    let unUser = new User({'username': 'nombreTest', 'aciertosExactos': 5, 'aciertosParciales': 3, 'errores': 1});
    expect(unUser.username).toBe('nombreTest');
    expect(unUser.aciertosExactos).toBe(5);
    expect(unUser.aciertosParciales).toBe(3);
    expect(unUser.errores).toBe(1);
});

const userTest = new User({'username': 'nombreTest', 'aciertosExactos': 5, 'aciertosParciales': 3, 'errores': 1});

test('getUser Test', () => {
    expect(userTest.getUser()).toStrictEqual({'username': 'nombreTest', 'aciertosExactos': 5, 'aciertosParciales': 3, 'errores': 1});
});

test('getAciertosExactos Test', () => {
    expect(userTest.getAciertosExactos()).toBe(5);
});

test('getAciertosParciales Test', () => {
    expect(userTest.getAciertosParciales()).toBe(3);
});

test('getErrores Test', () => {
    expect(userTest.getErrores()).toBe(1);
});