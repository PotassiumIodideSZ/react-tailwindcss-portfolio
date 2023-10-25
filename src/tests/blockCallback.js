/*
Есть асинхронные callback’и, которые нельзя выполнять второй раз, пока предыдущий вызов не разрезолвится. 
Напишите хелпер blockCallback, который поможет решить эту проблему.

Заодно напишите асинхронную функцию, которая будет выполнять роль такого callback’a (например, которая резолвится через какое-то время)

const func1 = () => {}; // какая-то асинхронная функция
// НАПРИМЕР, выводит "start" и ждёт 1 секунду, после чего резолвится

const func2 = blockCallback(func1);

func2(); // "start"
func2(); // ничего

setTimeout(() => func2(), 2000) // через 2 сек выведет "start"
*/

function blockCallback(callback) {
	let isBlocked = false;
	return function () {
	  if (!isBlocked) {
		isBlocked = true;
		Promise.resolve(callback()).then(() => {
		  isBlocked = false;
		});
	  }
	};
  }
  
  const func1 = () => {
	console.log("start");
	return new Promise((resolve) => setTimeout(resolve, 1000));
  };
  
  const func2 = blockCallback(func1);
  
  func2(); // "start"
  func2(); // nothing
  
  setTimeout(() => func2(), 2000); // after 2 seconds, outputs "start"
  