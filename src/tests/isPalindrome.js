/*

Реализуйте функцию isPalindrome(), которая возвращает true или false в зависимости от того, является ли переданная ей строка палиндромом (функция нечувствительна к регистру и к наличию в строке пробелов).

isPalindrome('')                                // true
isPalindrome('abcdcba')                         // true
isPalindrome('abcd')                            // false
isPalindrome('Аргентина манит негра')           // true

*/

function isPalindrome (str) {
    str = str.toLowerCase().replace(/ /g, '');
    const newStrArr = str.split('').reverse()
    return str === newStrArr.join('');
}
console.log(isPalindrome('123@##321'));
console.log(isPalindrome('abcdcba'));
console.log(isPalindrome('abcd'));
console.log(isPalindrome('Аргентина манит негра'));
 