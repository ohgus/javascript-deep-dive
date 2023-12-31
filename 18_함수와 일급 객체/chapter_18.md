# 📕 18장 함수와 일급 객체

## 📝 18.1 일급 객체

1. 무명의 리터럴로 생성할 수 있다. (런타임에 생성 가능)
2. 변수나 자료구조(객체 배열 등)에 저장할 수 있다.
3. 함수나 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

자바스크립트의 함수는 위 조건을 모두 만족하므로 일급 객체다.

#### 💡 함수가 일급 객체이기 때문에 ?

- 함수를 객체와 동일하게 사용할 수 있다.
- 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.
- 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으면 런타임에 함수 객체로 평가된다.
- 일반 객체와 같이 함수의 매개변수에 전달할 수 있다.
- 함수의 반환값으로 사용할 수도 있다.
- 일반 객체는 호출할 수 없지만, 함수 객체는 호출할 수 있다.
- 함수 객체는 고유의 프로퍼티를 소유한다.

## 📝 18.2 함수 객체의 프로퍼티

함수도 객체이므로 프로퍼티를 가질 수 있다.

**함수의 프로퍼티** : arguments, caller, length, name, prototype  
**상속 받는 프로퍼티** : \_\_proto\_\_ (모든 객체가 Object.prototype으로 부터 상속 받는다)

### ✏️ arguments 프로퍼티

- arguments 객체다.
- 함수 호출시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체다.
- 함수 내부에서 지역 변수처럼 사용된다.
- 함수 외부에서는 사용할 수 없다.
- 일부 브라우저에서 사용할 수 있지만 ES3부터 표준에서 폐지되었다.
- Function.arguments와 같은 방법은 권장하지 않고 arguments 객체를 참조하도록 한다.

자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 따라서 매개변수의 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.

함수가 호출되면 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급되어 암묵적으로 선언되고 undefined로 초기화된 이후 인수가 할당된다. 인수가 전달되지 않은 매개변수는 undefined 상태가 유지되고 초과로 전달되는 경우는 무시되지만 버려지지 않고 arguments 객체에 프로퍼티로 보관된다.

- arguments 객체는 인수를 키가 아닌 값으로 저장하고 키는 인수의 순서를 나타낸다.
- callee 프로퍼티는 호출되어 arguments 객체를 생성한 함수 자신을 가리킨다.
- length 프로퍼티는 인수의 개수를 가리킨다.

인수의 개수를 확인하지 않는 자바스크립트의 특성 때문에 인수 개수를 확인하고 이에 따라 동작을 달리 정의할 필요가 있다. 이 때 유용하게 사용되는 것이 arguments 객체다.

arguments 객체는 매개변수 개수를 확정할 수 없는 **가변 인자 함수**를 구현할 때 유용하다.

```js
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

#### 💡 arguments 객체의 Symbol(Symbol.iterator) 프로퍼티

- arguments 객체를 순회 가능한 자료구조인 이터러블로 만들기 위한 프로퍼티다.
- Dymbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하는 것에 의해 이터러블이 된다.

#### 💡 유사 배열 객체란?

length 프로퍼티를 가진 객체로 for 문으로 순회할 수 있는 객체.

- 배열이 아니므로 배열 메서드를 사용하면 에러가 발생한다.
- Function.prototype.call, Function.prototype.apply를 사용해 간접 호출해야 하는 번거로움이 있다. 하지만 ES6에서 도입된 Rest 파라미터를 활용해서 해결할 수 있다.

```js
// 기존
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

// Rest 파라미터 활용
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

// 동일하게 동작
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### ✏️ caller 프로퍼티

함수 자신을 호출한 함수를 가리킨다.

- ECMAScript 사양에 포함되지 않는 비표준 프로퍼티다.
- 이후 표준화될 예정이 없으니 사용하지 말자.

### ✏️ length 프로퍼티

함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.

- arguments의 length는 인자의 개수
- 함수 객체의 length는 매개변수의 개수

### ✏️ name 프로퍼티

함수 이름을 가리킨다.

- ES6 이전까지 비표준이었다.
- ES5에서는 빈 문자열을 값으로 갖는다.
- ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.
- 함수 이름과 함수를 가리키는 식별자는 다르다.
- 함수를 호출할 때는 식별자를 호출한다.

### ✏️ \_\_proto\_\_ 접근자 프로퍼티

모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다.

- [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.
- 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있다.
- [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 \_\_proto\_\_ 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.
- [[Prototype]] 내부 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

### ✏️ prototype 프로퍼티

생성자 함수로 호출할 수 있는 함수 객체 constructor만이 소유하는 프로퍼티다.

- non-constructor에는 없다.
- 함수가 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
