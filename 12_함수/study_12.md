# 📕 12장 함수

## 📝 12.1 함수란?

함수는 스코프, 실행 컨텍스트, 클로저, 생성자 함수에 의한 객체 생성, 메서드, this, 프로토타입, 모듈화 등과 깊은 관련이 있어 정확히 이해하고 사용해야 하는 핵심 중에 핵심 개념이다.

수학의 함수는 입력을 받아 출력을 내보내는 일련의 과정을 정의한 것이다. 프로그래밍의 함수도 같은 개념으로 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것이다.(똑같이 입력을 받아 출력을 내보냄)

- 매개변수 -> 입력을 전달받는 변수
- 인수 -> 입력
- 반환값 -> 출력
- 함수는 값이다.
- 함수는 여러개 존재할 수 있어 식별자인 함수 이름을 사용할 수 있다. (구분하기 위해)
- 함수 정의를 통해 생성한다.
- 함수 호출을 해야 함수가 실행되고 반환값을 반환한다.

```js
// f(x, y) = x + y
// 함수 정의
function add(x, y) {
  return x + y;
}

// f(1, 2) = 3
// 함수 호출
add(1, 2); // 3
```

## 📝 12.2 함수를 사용하는 이유

- 한번 정의하고 언제든 재사용이 가능하다. (효율성 증가)
- 유지보수의 편의성을 높이고 실수를 줄여 코드의 신뢰성을 높인다.
- 함수 이름은 변수의 이름과 마찬가지로 자신의 역할을 잘 설명해야 한다. (코드의 가독성 증가)

## 📝 12.3 함수 리터럴

함수는 객체 타입의 값이기 때문에 리터럴로 생성할 수 있다. 함수 리터럴은 functio 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성된다.

- 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다.
- 함수 객체만의 고유한 프로퍼티를 갖는다. (`arguments`, `caller`, `length`, `name`)

#### 💡 함수 이름

- 식별자 네이밍 규칙을 준수해야 한다.
- 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자다.
- 함수 이름은 생략할 수 있다.
  - 이름이 있는 함수 -> 기명 함수
  - 이름이 없는 함수 -> 무명/익명 함수

```js
// function f () {} === const f = function f () {}
const f1 = function f() {};

console.log(f); // Uncaught ReferenceError
```

#### 💡 매개변수 목록

- 0개 이상의 매개변수를 소괄호로 감싸고 쉼표로 구분한다.
- 각 매개변수에는 함수를 호출할 때 지정한 인수가 순서대로 할당된다. (순서의 유의미)
- 매개변수는 함수 몸체 내에서 변수와 동일하게 취급된다. (식별자 네이밍 규칙을 준수해야함)

#### 💡 함수 몸체

- 함수가 호출되었을 때 일괄적으로 실행될 문들을 하나의 단위로 정의한 코드 블록
- 함수 몸체는 함수 호출에 의해 실행된다.

#### 💡 함수 객체 고유의 프로퍼티

```
✅ arguments

  - 함소 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체
  - 함수 내부에서 지역 변수처럼 사용된다. (함수 외부에서 참조 불가능)
  - ES3부터 표준에서 폐지 => Function.arguments 같은 방법은 비권장
  - JS는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
  - arguments 객체는 calle, length, Symbol, proto를 프로퍼티로 가진다.

✅ caller

  - EXMAScript 사양에 포함되지 않는 비표준 프로퍼티.
  - 자신을 호출한 함수를 가리킨다.

✅ length

  - 매개변수의 개수를 가리킨다.

✅ name

  - 함수의 이름을 나타내는 프로퍼티.
  - ES6이전까지는 비표준이었다가 ES6부터 정식표준이 되었다.
```

## 📝 12.4 함수 정의

함수 정의란 함수 호출 이전에 매개변수,실행할 문, 반환 값을 지정하는 것. 정의된 함수는 JS 엔진에 의해 평가되어 함수 객체가 된다.

```js
// 함수 선언문
function fullName(first, last) {
  return first + last;
}

// 함수 표현식
const fullName = function (first, last) {
  return first + last;
};

// Function 생성자 함수
const fullName = new Function("first", "last", "return first + last");

// 화살표 함수
const fullName = (first, last) => first + last;
```

함수는 선언문이 평가되면 식별자가 암묵적으로 생성되고 함수 객체가 생성되기 때문에 "선언"이 아니라 "정의"한다고 표현한다.

### ✏️ 12.4.1 함수 선언문

- 함수 리터럴과 형태가 동일하다.
- 이름을 생략할 수 없다. (리터럴은 생략 가능)
- 표현식이 아닌 문.
  - 하지만 변수에 할당할 수 있다.
  - JS 엔진은 문맥에 따라 중의적인 코드를 다르게 해석하기 때문.
  - 함수 선언문에 경우 문맥에 따라 함수 리터럴 표현식으로 해석된다.
- JS 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.
- 리터럴 표현식으로 평가된 함수 선언문의 경우 함수 이름과 동일한 식별자를 생성하지 않는다. 따라서 외부에서 호출할 수 없다.
- 함수를 호출하는 것은 함수 이름으로 호출하는 것이 아닌 함수를 가리키는 식별자를 호출하는 것이다.

```js
function name() {} // 함수 선언문으로 평가

name();

(function name() {}); // 함수 리터럴 표현식으로 평가

name(); // ReferenceError
```

### ✏️ 12.4.2 함수 표현식

함수는 객체 타입이기 때문에 값처럼 변수에 할당하거나 프로퍼티 값으로 사용할 수 있고 배열의 요소도 될 수 있다. 이렇게 값의 성질을 갖는 객체를 일급 객체라고 한다.

**일급 객체 => 값처럼 자유롭게 사용할 수 있다**

```js
const add = function foo(x, y) {
  return x + y;
};

add(1, 2); // 3
foo(1, 2); // ReferenceError
```

- 표현식인 문이다.
- 변수에 할당할 수 있다.
- 이름을 생략할 수 있다. => 익명 함수

### ✏️ 12.4.3 함수 생성 시점과 함수 호이스팅

#### 함수 선언문

함수 호이스팅: 함수 선어문이 코드의 선두로 끌어 올려진 것처럼 동작하는 특징

- 런타임 이전에 함수 객체가 생생된다.
- 생성된 객체를 암묵적으로 생성한 식별자에 할당한다.
- 선언문 이전에 호출할 수 있다.

#### 함수 표현식

변수 호이스팅

- 런타임 이전에 변수가 초기화되면서 `undefined`가 할당된다. -> var 키워드
- 런타임 시점에 평가되어 함수 객체가 된다.
- 선언문 이전에 호출할 수 없다.

### ✏️ 12.4.4 Function 생성자 함수

매개변수 목록과 함수 몸체를 문자열로 전달아면서 호출하면 함수 객체를 생성하여 반환한다. (new 연산자 없이 호출 가능)

- 일반적이지 않고 바람직하지 않은 방식
- 클로저를 생성하지 않는다

```js
const fullName = new Function("first", "last", "return first + last");
```

### ✏️ 12.4.5 화살표 함수

- ES6에서 도입
- 익명 함수로 정의한다.
- `function` 키워드 대신 `=>` 를 사용한다.
- 함수 선언문, 표현식을 완전히 대체하는 것은 아니다.
- 표현과 내부 로직 모두 간략화 되어 있다.
- 기존 함수와 this의 바인딩 방식이 다르다.
- prototype 프로퍼티, arguments 객체가 없다.

```js
const add = (x, y) => x + y;
```

## 📝 12.5 함수 호출

- 함수는 함수를 가리키는 식별자와 함수 호출 연산자로 호출한다.
- 호출 연산자 내에는 0개 이상의 인수를 쉼표로 구분해서 나열한다.
- 함수가 호출되면 현재의 실행 흐름을 함수로 옮긴다.
- 실행 흐름이 옮겨지면 매개변수에 인수가 순서대로 할당되고 함수 몸체의 문들이 실행된다.

### ✏️ 12.5.1 매개변수와 인수

함수 외부에서 필요한 값을 내부로 전달하기 때 매개변수를 통해 인수를 전달한다.

- 함수는 매개변수의 개수와 인수의 개수가 맞는지 체크하지 않는다. => 개수가 달라도 에러가 발생하지 않는다.
- 인수가 부족해 할당되지 않은 매개변수의 값은 `undefined`다.
- 인수가 매개변수보다 많은 경우 초과된 인수는 무시된다. => 버려지는 것이 아니라 `arguments` 객체의 프로퍼티로 보관됨

#### ⚙️ 인수

- 값으로 평가될 수 있는 표현식이어야 한다.
- 함수를 호출할 때 지정한다.
- 개수와 타입에 제한이 없다.

#### ⚙️ 매개변수

- 함수를 정의할 때 선언한다.
- 함수 몸체 내부에서 변수와 동일하게 취급된다. => 함수가 호출되면 몸체 내부에서 암묵적으로 매개변수가 생성되고 `undefined`로 초기화 된다.
- 함수 내부에서만 조작할 수 있다.

### ✏️ 12.5.2 인수 확인

JS는 동적 타입의 언어로 함수의 매개변수의 타입을 사전에 정의할 수 없고 매개변수의 개수와 인수의 개수가 일치하는지 확인하지 않는다. 따라서 개발자의 의도와 다르게 매개변수에 다른 타입의 값이 전달되거나 필요한 인수가 전달되지 않아 예상치 못한 오류가 발생할 수 있다.

- 함수를 정의할 때 적절한 인수가 전달되었는지 확인할 필요가 있다.
- 정적 타입을 선언할 수 있는 타입스크립트를 활용하는 것도 방법이다.
- 인수가 전달되지 않은 경우를 위해 단축 평가를 통해 매개변수의 기본 값을 할당할 수 있다.
- 매개변수의 기본 값은 인수가 전달되지 않은 경우와 `undefined`인 경우만 적용된다.

```js
// 인수 타입 확인
function add(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError();
  }

  return x + y;
}

// 매개변수 기본 값 설정
function add(x = 0, y = 0) {
  return x + y;
}
```

### ✏️ 12.5.3 매개변수의 최대 개수

- ECMAScript 사양에는 명시적으로 제한하지 않는다.
- 매개변수는 순서의 의미가 있어 많아지면 호출할 때 인수의 순서를 고려해야한다.
- 많은 매개변수는 함수의 사용법을 이해하기 힘들게 많들고 실수를 유발한다.
  - 매개변수의 개수나 순서가 변경되면 함수를 사용하는 코드를 전부 변경해야 한다. => 유지보수성 저하
- 이상적인 매개변수의 개수는 0개이고 적을수록 좋다.
- 함수는 한가지 일을 하고 최대한 작게 만드는 것이 좋은데 매개변수가 많아지면 그렇지 않을 가능성이 높다.
  - 최대 3개를 권장한다.
  - 3개를 넘을 경우 매개변수를 하나로 선언하고 객체로 넘기는 것을 추천한다.
  - 객체로 넘기는 경우 프로퍼티 키를 정확히 지정해야 한다.
  - 객체를 함수 내부에서 조작하면 외부에서도 변경되니 주의해야 한다.

### ✏️ 12.5.4 반환문

`return` 키워드와 표현식으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환할 수 있다.

```js
function fullName(first, last) {
  return last + first;
}

const name = fullName("명석", "오");
```

- 함수 호출은 표현식으로 `return` 키워드가 반환한 표현식의 평가 결과를 반환 값으로 평가한다.
- 반환문은 함수의 실행을 중단하고 함수를 빠져나온다.
- 반환문은 `return` 키워드 뒤에 오는 평가식을 평가해 반환한다.
- `return` 키워드 뒤에 반환할 표현식을 명시적으로 지정하지 않은면 `undefined`가 반환된다.
- 반환문은 생략할 수 있다. 반환문이 생략된 함수는 마지막 문까지 실행한 후 암묵적으로 `undefined`를 반환한다.
- `return` 키워드와 뒤에 오는 표현식 사이에 줄바꿈이 있으면 세미콜론 자동 삽입 기능에 의해서 `return` 키워드 뒤에 세미콜론이 삽입되 의도치 않은 결과가 발생할 수 있다.
- 반환문은 함수 내부에서만 사용할 수 있다. -> 전역에서 사용하면 `SyntaxError`
- `Node.js`는 파일별로 독립적인 파일 스코프를 갖기 때문에 전역에서 반환문을 사용해도 에러가 발생하지 않는다.

## 📝 12.6 참조에 의한 전달과 외부 상태의 변경

매개변수도 함수 내부에서 변수와 동일하게 취급되므로 타입에 따라 "값에 의한 전달", "참조에 의한 전달" 방식을 따른다.

- 함수 호출시 매개변수에 값을 전달하는 것을 "값에 의한 호출", "참조에 의한 호출"이라 부르기도 한다. => 동작 방식은 전달과 동일

```js
function changeValue(primitive, obj) {
  primitive += 100; // 원시 값은 불변 값이기 때문에 재할당으로 값을 변경
  obj.name = "lee";
}

let num = 100;
const person = { name: "oh" };

changeValue(num, person);

console.log(num); // 100 -> 원시 값은 원본 값이 훼손되지 않는다.
console.log(person); // name: "lee" -> 객체는 원본 값이 훼손된다.
```

- 원시 값은 복사된 새로운 값을 매개변수에 할당하기 때문에 원본이 변경되지 않는다.
- 객체는 객체의 참조 값을 매개변수에 할당하기 때문에 원본이 변경된다.
- 함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워지고 코드의 복잡성을 높여 가독성이 떨어진다.
- 복잡한 코드에서 의도치 않은 객체의 변경은 추적하기 어렵다.
- 이런 문제를 해결하기 위한 방법 중 하나는 객체를 불변 객체로 만들어 사용하는 것이다.
  - -> 객체를 마치 원시 값처럼 변경 불가능한 값으로 동작하게 하는 것.
  - -> 객체의 본사본을 새롭게 생성하는 비용이 발생
  - -> 객체의 상태 변경을 원천봉쇄한다.
  - -> 객체의 상태 변경이 필요한 경우 객체의 방어적 복사(깊은 복사)를 통해 새로운 객체를 생성하고 재할당을 통해 교체한다. => 외부 상태가 변경되는 부수 효과를 없앨 수 있다.

---

외부 상태를 변경하지도 않고 의존하지도 않는 함수를 순수 함수라 한다. 이런 순수 함수를 통해 부수 효과를 억제하여 오류를 피하고 프로그램의 안정성을 높이는 것은 함수형 프로그래밍이라 한다.

## 📝 12.7 다양한 함수의 형태

### ✏️ 12.7.1 즉시 실행 함수

함수 정의와 동시에 즉시 호출되는 함수. 단 한 번만 호출되며 다시 호출할 수 없다. 일반적으로 익명 함수를 사용한다.

- 반드시 그룹 연산자로 감싸야 한다. => 그룹 연산자가 없으면 에러가 발생한다.
- 그룹 연산자로 감싸는 이유는 함수 리터럴을 평가해 함수 객체를 생성하기 위함이다. => 함수 객체를 생성할 수 있다면 다른 연산자를 사용해도 괜찮다.
- 기명 함수를 사용할 수 있지만 그룹 연산자 내부에서 함수 리터럴로 평가되어 함수 몸체에서만 참조할 수 있는 식별자이므로 다시 호출할 수 없다.
- 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있고 인수를 전달할 수 있다.

```js
// 익명 즉시 실행 함수
(function () {
  var a = 3;
  var b = 5;
  return a * b;
})();

// 기명 즉시 실행 함수
(function foo() {
  var a = 3;
  var b = 5;
  return a * b;
})();

foo(); // ReferenceError

// 그룹 연산자를 사용하지 않은 경우
function () {}() // 함수 선언문은 기명 함수를 사용해야한다.

function foo() {}() // 세미콜론 자동 삽입으로 코드블록 뒤에 세미콜론이 삽입된다.

// 다른 방식으로 즉시 실행 함수 생성하기
!function () {}()

+function () {}()

// 값의 반환, 인수 전달
let res = (function (a, b) {
  return a * b;
}(3, 5));

console.log(res); // 15
```

### ✏️ 12.7.2 재귀 함수

함수가 자기 자신을 호출하는 것, 재귀 호출을 수행하는 함수

- 반복되는 처리를 위해 사용한다. -> 반복문 대신 사용가능
- 재귀함수를 호출할 때 호출하는 식별자는 함수 이름이다. -> 함수를 가리키는 식별자 이름으로도 호출 가능
- 함수의 탈출 조건을 명시하지 않으면 무한 루프에 걸린다. -> 스택 오버플로
- 대부분의 재귀 함수는 `for`, `while` 문으로 구현 가능하다.
- 반복문 보다 직관적으로 사용 가능한 겨우에만 사용하는 것이 바람직하다.

```js
function countdown(n) {
  if (n < 0) return;
  console.log(n);

  contdown(n - 1);
}

countdown(10);

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));

const foo = function factorial(n) {
  if (n <= 1) return 1;
  return n * foo(n - 1);
};

console.log(foo(5));
```

### ✏️ 12.7.3 중첩 함수

함수 내부에 정의된 함수를 중첩 함수, 중첩 함수를 포함하는 함수를 외부 함수라 부른다.

- 중첩 함수는 외부 함수 내부에서만 호출할 수 있다.
- 일반적으로 외부 함수를 돕는 헬퍼 함수의 역학을 한다.
- ES6 부터 함수 선언은 어디서든 가능하지만 호이스팅으로 인해 혼란이 발생할 수 있어 `if`, `for` 문 등의 코드 블록에서 함수를 정의하는 것은 바람직하지 않다.

```js
function outer() {
  let x = 1;

  function inner() {
    let y = 2;

    console.log(x + y);
  }

  inner();
}

outer();
```

### ✏️ 12.7.4 콜백 함수

- 콜백함수: 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수
- 고차 함수: 매개변수를 통해 함수의 외부에서 콜백 함수를 전달 받은 함수

---

- 함수 합성이 필요한 경우 콜백 함수를 활용할 수 있다.
- 함수 합성 => 함수의 변하지 않는 공통 로직 외에 경우에 따라 변경되는 로직을 함수 외부에서 내부로 전달하는 것.
- 고차 함수는 콜백 함수를 자신의 일부로 합성한다.
- 고차 함수는 전달받은 콜백 함수의 호출 시점을 결정해 호출한다. -> 콜백 함수는 고차 함수에 의해 호출됨 따라서 함수 자체를 전달해야 한다. 함수 호출 X
- 고차 함수는 콜백 함수에 인수를 전달할 수 있다.
- 콜백 함수가 고차 함수 내부에서만 사용된다면 함수 리터럴로 정의하여 바로 쓰는 것이 일반적이지만 외에도 자주 사용된다면 외부에서 따로 정의하여 사용한다.
- 콜백 함수는 함수형 프로그래밍 패러다임 외에도 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 중요한 패턴이다.
- 배열 고차 함수에서도 사용된다. (`map`, `filter`, `reduce`)
- 중첩 함수처럼 헬퍼 함수의 역할을 하지만 외부에서 내부로 주입하기 때문에 자유롭게 교체할 수 있는 장점이 있다.

```js
function days(func) {
  for (let day = 0; day < 7; day++) {
    console.log("오늘은");
    func(day);
  }
}

const logDay = (day) => {
  if (day < 5) {
    console.log("평일");
  } else {
    console.log("주말");
  }
};

days(logDay);

days(function (day) {
  if (day < 5) {
    console.log("평일");
  } else {
    console.log("주말");
  }
});

days((day) => {
  if (day < 5) {
    console.log("평일");
  } else {
    console.log("주말");
  }
});
```

### ✏️ 12.7.5 순수 함수와 비순수 함수

#### 외부 상태

- 전역 변수
- 서버 데이터
- Console
- DOM
- 등...

#### 순수 함수

- 외부 상태에 의존하지 않고 변경하지 않는 부수 효과가 없는 함수
- 동일한 인수가 전달되면 언제나 같은 값을 반환한다.
- 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성한다.
- 최소 하나의 인수를 전달 받는다.
- 인수를 전달 받지 않는 함수는 상수와 다르지 않다.
- 인수의 불변성을 유지한다.

```js
let count = 0;

// 동일한 인수가 들어오면 항상 같은 값을 생성한다
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과를 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1
```

#### 비순수 함수

- 외부 상태에 의존하거나 외부 상태를 변경하는 부수 효과가 있는 함수
- 외부 상태에 의존하지 않지만 내부 상태가 호출될 때마다 변화하는 값(예:현재 시간)
- 변화를 추적하기 어렵다.
- 코드의 복잡성을 증가시킨다.

```js
let count = 0;

function increase() {
  return ++count; // 외부 상태에 의존하면 외부 상태를 변경
}

// 외부 상태를 변경한다
increase();
console.log(count); // 1
```

#### 함수형 프로그래밍

순수 함수와 보조 함수의 조합을 통해 부수 효과를 최소화하고 불변성을 지향하는 프로그래밍

- 조건문과 반복문을 제거해 복잡성을 해결
- 변수 사용을 억제하거나 생명주기를 짧게해 상태 변경 오류를 최소화

JS는 멀티 패러다임 언어로 객체지향 프로그래밍과 함수형 프로그래밍을 적극 활용한다.
