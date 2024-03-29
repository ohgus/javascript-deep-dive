# 📕 13장 스코프

## 📝 13.1 스코프란?

스코프: **식별자가 유효한 범위**

모든 식별자는 자신이 선언되 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 스코프가 결정된다.

- 모든 언어의 기본적이며 중요한 개념이다.
- JS의 스코프는 다른 언어와 구별되는 특징이 있다.
- JS 엔진은 "식별자 결정"을 통해 참조할 변수를 결정한다.
- 스코프는 식별자를 검색할 때 사용되는 규칙이라고도 한다.

```js
let x = "global"; // 전역 스코프

function foo() {
  let x = "local"; // 함수 스코프
  console.log(x); // local
}

foo();

console.log(x); // global
```

- JS 엔진은 코드를 실행할 때 코드의 문맥을 고려한다. -> 어디서 실행되는지 주변에 어떤 코드가 있는지 확인한다. -> 렉시컬 환경
- 스코프를 통해 변수 이름의 충돌을 방지하여 같은 이름의 변수를 사용할 수 있게 한다.
- 스코프 내에서 식별자는 유일하다. -> 다른 스코프에는 중복이 있을 수 있다.

#### 💡 코드의 문맥과 환경

렉시컬 환경을 구현한 것이 "실행 컨텍스트"이며, 모든 코드는 실행 컨텍스트에서 평가되고 실행된다.

#### 💡 var 키워드로 선언한 변수의 중복 선언

```js
function foo() {
  var x = 1;

  var x = 2; // var 키워드가 없는 것처럼 동작한다.
}

// const, let은 중복 선언을 허용하지 않는다.
function bar() {
  let x = 1;
  let x = 2; // SyntaxError
}
```

## 📝 13.2 스코프의 종류

| 구분 |         설명          |   스코프    |   변수    |
| :--: | :-------------------: | :---------: | :-------: |
| 전역 | 코드의 가장 바깥 영영 | 전역 스코프 | 전역 변수 |
| 지역 |    함수 몸체 내부     | 지역 스코프 | 지역 변수 |

변수는 자신이 **선언된 위치**(전역 또는 지역)에 의해 스코프가 결정된다.

- 전역 선언 -> 전역 스코프, 전역 변수
- 지역 선언 -> 지역 스코프, 지역 변수

### ✏️ 13.2.1 전역과 전역 스코프

```js
let x = "global x";
let y = "global y";

function localFunc() {
  let y = "local y";
  let x = "local x";

  console.log(x); // local x
  console.log(y); // local y
}

console.log(x); // global x
console.log(y); // global y
```

전역 변수는 어디에서든 참조할 수 있다.

### ✏️ 13.2.2 지역과 지역 스코프

지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효하다. => 상위 스코프에서는 참조할 수 없음

## 📝 13.3 스코프 체인

중첨 함수 처럼 스코프도 중첩된다. => 스코프가 함수의 중첩에 의해 계층적 구조를 갖는다. => 스코프 체인

외부 함수 지역 스코프를 상위 스코프라 한다.

```js
// 전역 -> outer의 상위 스코프

function outer() {
  // inner의 상위 스코프
  function inner() {}
}
```

변수를 참조할 때 JS 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색한다. -> 상위 스코프에서 선언한 변수를 하위 스코프에서도 참조 가능

- 스코프 체인은 물리적인 실체로 존재한다.
- JS 엔진은 코드를 실행하기 전에 스코프 체인같은 계층 구조를 실제로 생성하고 변수 선언이 실행되면 변수 식별자가 자료구조에 키로 등록된다. 변수 할다이 일어나면 이 자료구조의 변수 식별자에 해당하는 값을 변경한다.
- 스코프 체인은 실행 컨텍스트의 렉시컬 환경을 단방향으로 연결한 것이다.

### ✏️ 13.3.1 스코프 체인에 의한 변수 검색

상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다. -> 상속과 유사한 개념

### ✏️ 13.3.2 스코프 체인에 의한 함수 검색

함수도 변수 검색과 같은 로직으로 동작한다. -> 스코프는 변수를 검색하는 규칙이 아닌 식별자를 검색하는 규칙이기 때문

## 📝 13.4 함수 레벨 스코프

지역은 함수 몸체 내부를 뜻하고 지역은 지역 스코프를 만든다 -> 코드 블록이 아닌 함수에 의해서만 지역 스코프가 생성된다.

C나 자바 등을 비롯한 대부분의 프로그래밍 언어는 함수 몸체만이 아니라 모든 코드 블록이 지역 스코프를 만든다. -> 블록 레벨 스코프

var 키워드로 선언된 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. -> 함수 레벨 스코프

```js
var x = 10;

if (true) {
  var x = 20;

  // 함수가 아니기 때문에 지역으로 인정하지 않는다.
  // 그래서 중복 선언이 되고 재할당이 이루어진다.
}

console.log(x); // 20
```

## 📝 13.5 렉시컬 스코프

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();
```

**위 예제에서 bar 함수의 상위 스코프를 결정하는 두가지 패턴**

1. 함수를 어디서 호출했는지에 따라 상위 스코프가 결정된다. (동적 스코프)

   - foo 함수의 지역 스코프와 전역 스코프가 상위 스코프가 된다.
   - 함수를 정의하는 시점에는 어디서 호출될지 알 수 없기 때문에 함수가 호출되는 시점에 상위 스코프를 결정한다.

2. 함수를 어디서 정의했는지에 따라 상위 스코프가 결정된다. (렉시컬 스코프, 정적 스코프)
   - 함수의 정의가 평가되는 시점에 상위 스코프가 결정된다.
   - 자바스크립트 포함 대부분의 언어는 렉시컬 스코프를 따른다.
   - 함수가 호출되는 시점은 아무 영향을 주지 않는다.
   - 함수가 정의될 때 상위 스코프를 항상 기억한다. 호출될 때마다 함수의 상위 스코프를 참조할 필요가 있기 때문.

자바스크립트는 렉시컬 스코프를 따르기 때문에 위 예제에서 bar의 상위 스코프는 전역 스코프가 된다.

## 공유하고 싶은 정보

렉시컬 스코프, 실행 컨텍스트, 클로저 한번에 같이 보면 좋은 연관 정보들
