/*
Задача на методы массивов/объектов/строк в JS
Нужно уложиться в ограничению по количеству разных методов

Проверки на тип входных данных не нужны
Должны отрабатывать только примеры, указанные ниже
*/

// квадраты чисел - 1 метод
function f1(array) {
  return array.map((x) => x * x); //.method(...)
}
console.log("f1", f1([1, 2, 3])); // f1 [1, 4, 9]

// только нечетные числа - 1 метод
function f2(array) {
  return array.filter((x) => x % 2 !== 0); //.method(...)
}
console.log("f2", f2([1, 2, 3])); // f2 [1, 3]

// объеденить массивы - 1 метод
function f3_1(array, array2) {
  return array.concat(array2);
}
function f3_2(array, array2) {
  return array.push(...array2);
}

const x3_1 = [1, 2, 3];
console.log("f3_1", x3_1); // // f3_1 [1, 2, 3]
console.log("f3_1", f3_1(x3_1, [4, 5])); // f3_1 [1, 2, 3, 4, 5]
console.log("f3_1", x3_1); // // f3_1 [1, 2, 3]
const x3_2 = [1, 2, 3];
console.log("f3_2", x3_2); // // f3_2 [1, 2, 3]
console.log("f3_2", f3_2(x3_2, [4, 5])); // f3_2 5
console.log("f3_2", x3_2); // // f3_2 [1, 2, 3, 4, 5]

// отсеять ненужные - 2 метода
function f4(array, array2) {
  return array.filter((x) => !array2.includes(x));
}
console.log("f4", f4([1, 2], [2, 3])); // f4 [1]

// Проверить, что все элементы равны value - 1 метод
function f5(array, value) {
  return array.every((x) => x === value);
}

console.log("f5", f5([1, 1], 1)); // f5 true
console.log("f5", f5([1, 2], 1)); // f5 false

// вернуть undefined - 1 метод
function f6(array) {
  return array.find(() => false);
}

console.log("f6", f6([1, 2, 3])); // f6 undefined

// сумма - 1 метод
function f7(array) {
  return array.reduce((acc, x) => acc + x, 0);
}
console.log("f7", f7([1, 2, 3])); // f7 6

// проверка того, что элемент находится в массиве (3 разных способа) - 1 метод
function f8_1(array, value) {
  return array.includes(value);
}
function f8_2(array, value) {
  return array.indexOf(value) !== -1;
}
function f8_3(array, value) {
  return array.find((x) => x === value) !== undefined;
}

console.log("f8_1", f8_1([0, 1, 2], 1)); // f8_1 true
console.log("f8_1", f8_1([0, 1, 2], 4)); // f8_1 false
console.log("f8_2", f8_1([0, 1, 2], 1)); // f8_2 true
console.log("f8_2", f8_1([0, 1, 2], 4)); // f8_2 false
console.log("f8_3", f8_1([0, 1, 2], 1)); // f8_3 true
console.log("f8_3", f8_1([0, 1, 2], 4)); // f8_3 false

// строка из значений - 1 метод
function f9(array) {
  return array.join(""); // .method(...)
}
console.log("f9", f9([0, 1, 2, {}])); // f9 '012[object Object]'

// уникальные значения - 2 метода
function f10(array) {
  return array.filter((x, i) => array.indexOf(x) === i);
}
console.log("f10", f10([1, 1, 2, 3, 0, "0"])); // f10 [1, 2, 3, 0, '0']

// Добавить префикс к ключам объекта (в начало) - 2 метода
function f11(obj, prefix) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[prefix + key] = obj[key];
    return acc;
  }, {});
}

console.log("f11", f11({ key1: 1, key2: "2" }, "_")); // f11 {_key1: 1, _key2: '2'}

// Убрать пробелы из строки - 1 метод
function f12(str) {
  return str.replace(/[\W_]/g, ""); // .method(...)
}
console.log("f12", f12("1 2 3")); // f12 '123'

// Приведение строки к нижнему регистру - 1 метод
function f13(str) {
  return str.toLowerCase(); // .method(...)
}
console.log("f13", f13("aA2")); // f13 'aa2'

// Перевернуть строку - 2 метода
function f14(str) {
  return str
    .split("")
    .reverse()
    .join(""); // .method(...)
}
console.log("f14", f14("123_")); // f14 '_321'

// Сделать объект с заданными ключами и значениями 0 - 1 метод
function f15(keys) {
  return keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}
console.log("f15", f15(["key1", "key2"])); // f15 {key1: 0, key2: 0}
console.log("f15", f15([])); // f15 {}

// Вывести 3 наиболее близких числа к value
// (!!!) исходный массив не должен меняться / перемешиваться
// 3 метода
function f16(array, value) {
  return array
    .map((x) => [x, Math.abs(x - value)])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map((x) => x[0]);
}
const x16 = [1, 2, 3, 4, 5];
console.log("f16", f16(x16, 3.4)); // f16 [3, 4, 2]

// Преобразовать массив в 2-х мерную матрицу с размерами width и height - 3 метода

function f17(array, width, height) {
  return array.reduce(
    (acc, curr, i) => {
      if (i % width === 0) acc.push([]);
      acc[acc.length - 1].push(curr);
      return acc;
    },
    []
  );
}
console.log("f17", f17([1, 2, 3, 4], 2, 2)); // f17 [[1, 2], [3, 4]]


// Создать объект из значений
// Ключи имеют формат prefix_index, где prefix - значение переменной prefix, index - индекс значения
// 1 метод
function f18(values, prefix) {
  return values.reduce((acc, value, index) => {
    acc[prefix + `_${index}`] = value;
    return acc;
  }, {});
}

console.log("f18", f18([0, 2, 1], "key")); // {key_0: 0, key_1: 2, key_2: 1}

