# 📕 17장 생성자 함수에 의한 객체 생성

## 📝 17.1 Object 생성자 함수

생성자 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다. JS에는 Object 외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌트인 생성자 함수를 제공한다.

객체를 생성하는 방식은 리터럴을 사용하는 것이 더 간편하다. 특별한 이유가 없다면 Object 생성자 함수보다 리터럴을 사용해 객체를 만들자.

```js
const myDog = new Object();

myDog.name = 'Daebak';
myDog.age = 5;
myDog.bark = function () {
  console.log(`${this.name} barks!`);
};

console.log(myDog); // {name: Daebak, age: 5, bark: f}
```
