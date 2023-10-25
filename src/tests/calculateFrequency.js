/*

функция должна найти частоту каждого уникального значения в массиве
и вывести индексы в исходном массиве для каждого такого значения.
Дополнительно: В результате в начале должны быть элементы, встречаемые чаще всего
а в конце - реже всего

функция принимает массив и возвращает массив
каждая строка в массиве - объект вида 
{
	value: number,
	indexes: number[],
}

value - значение из исходного массива
indexes - позиции элементов в исходном массиве

----

calculateFrequency([1,1,1]): [{value: 1, indexes: [0, 1, 2]}]
calculateFrequency([1,2, 1,1]): [{value: 1, indexes: [0, 2, 3]}, {value: 2, indexes: [1]}]
calculateFrequency([]): [],
calculateFrequency([null, {}, {}, 1, null, 'false', '1']): ?

*/

function calculateFrequency(arr) {
    let frequency = {};
    arr.forEach((value, index) => {
        const key = JSON.stringify(value);
        if (frequency[key]) {
            frequency[key].indexes.push(index);
        } else {
            frequency[key] = { value: value, indexes: [index] };
        }
    });
    let result = Object.values(frequency);
    result.sort((a, b) => b.indexes.length - a.indexes.length);
    return result;
}

console.log(calculateFrequency(['[object Object]', {"123":1}, {"123":2}]));
// console.log(calculateFrequency([1,1,1]));
// console.log(calculateFrequency([1,2, 1,1]));
// console.log(calculateFrequency([]));
// console.log(calculateFrequency([null, {}, {}, 1, null, 'false', '1']));