"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let [surname, firstName] = fio.split(' ');
    return firstName + ' ' + surname;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array))
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (array.length !== 0) {
        const minimum = (array) => array.reduce((x, y) => Math.min(x, y));
        const maximum = (array) => array.reduce((x, y) => Math.max(x, y));
        return maximum(array)/minimum(array);
    }
    return false;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor(){   
        this.dict = new Map();
    }

    set(key, value){
        if (typeof(key) !== 'string' || typeof(value) !== 'string') return false;
        this.dict.set(key, value);
        return true;
    }

    get(key){
        if (typeof(key) !== 'string' || !this.dict.has(key)) return false;
        return this.dict.get(key);
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
