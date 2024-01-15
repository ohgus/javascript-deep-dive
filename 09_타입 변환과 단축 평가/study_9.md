# 📕 9장 타입 변환과 단축 평가

## 📝 9.1 타입 변환이란?

JS의 모든 값에는 타입이 있고 이는 개발자의 의도에 따라 변경이 가능하다.

- 원시 값의 타입은 변하지 않고 변경된 타입의 새로운 값을 생성한다.

#### 💡 명시적 타입 변환 or 타입 캐스팅

개발자가 의도적으로 값의 타입을 변경하는 것.

- 값의 타입을 예측할 수 있다.

#### 💡 암묵적 타입 변환 or 타입 강제 변환

개발자의 의도와 상관없이 표현식을 평가하는 과정에서 JS 엔진에 의해 암묵적으로 타입이 변환되는 것.

- 변경된 타입이 재할당 되지 않는다.
- 표현식을 에러 없이 평가하기 위해 암묵적 타입 변환해 새로운 값을 만들어 한 번 사용하고 버린다.
- 암묵적 타입 변환이 발생한다면 어떤 타입으로 변환되는지, 변환된 값이 어떻게 평가되는지 예측할 수 있어야 한다.
- 타입 변환의 결과를 예측하지 못하면 오류를 생산할 수 있다.
- 타입 변환의 결과를 예측할 수 있다면 명시적 타입 변환보다 암묵적 타입 변환이 가독성 측면에서 더 좋을 수 있다.

## 📝 9.2 암묵적 타입 변환

JS 엔진은 표현식을 평가할 때 가급적 에러가 발생하지 않도록 코드의 문맥에 맞게 암묵적 타입 변환해 표현식을 평가한다. 변환된 타입은 원시 타입 중 하나다.

### ✏️ 9.2.1 문자열 타입으로 변환

- 문자열 연결 연산자의 목적은 문자열 값을 만드는 것이기 때문에 모든 피연산자는 문자열 타입이어야 한다.
- 문자열 연결 연산자를 사용해 피연산자 중 문자열이 아닌 값을 문자열 타입으로 변환한다.
- 템플릿 리터럴의 경우 피연산자가 아닌 평가결과 자체를 문자열로 변환한다.

```js
0 + ""; // "0"
NaN + ""; // "NaN"

// 불리언, null, undefined 타입
true + ""; // "true"
null + ""; // "null"
undefined + ""; // "undefined"

// 심볼 타입
Symbol() + ""; // TypeError

// 객체 타입
({}) + ""; // "[object Object];
[] + ""; // ""
[10, 10] + ""; // "10,10"
function(){} + ""; // "function(){}"
```

### ✏️ 9.2.2 숫자 타입으로 변환

- 산술 연산자의 목적은 숫자 값을 만드는 것이기 때문에 모든 피연산자는 숫자 타입이어야 한다.
- 숫자 타입으로 변환할 수 없는 피연산자가 있으면 평가 결과가 `NaN`이 된다.
- 비교 연산자는 값의 크기를 비교한다 따라서 피연산자의 타입이 숫자 타입이어야 한다.
- `+`단항 연산자는 피연산자가 숫자 타입이 아닌 경우 숫자 타입의 값으로 암묵적 타입 변환한다.

```js
1 - "1"; // 0
1 * "10"; // 10
1 / "string"; // NaN

"1" < 10; // true

+""; // 0
+"string"; // NaN
+"10"; // 10

+true; // 1
+false; // 0
+null; // 0
+undefined; // NaN
+Symbol(); // TypeError
+{}; // NaN
+[]; // 0
+function () {}; // NaN
```

### ✏️ 9.2.3 불리언 타입으로 변환

`if` 문이나 `for` 문과 같은 제어문의 조건식은 불리언 값으로 평가되어야 한다. JS 엔진은 조건식의 평가 결과를 암묵적 타입 변환한다.

- JS 엔진은 불리언 타입이 아닌 값을 Truthy 값, Falsy 값으로 구분한다.
- 불리언 값으로 평가되어야 하는 문맥에서 Truthy 값은 `true`로, Falsy 값은 `false`로 타입 변환된다.
- Falsy 값: `false`, `undefined`, `null`, 0, -0, `NaN`, ""
- Truthy 값: Falsy 값 외 모든 값

```js
if(truthy) {
  코드 블록 실행
}

if(falsy) {
  코드 블록 미실행
}
```

## 📝 9.3 명시적 타입 변환

개발자의 의도대로 명시적 타입 변환을 하는 방법4₩₩

- 표준 빌트인 생성자 함수를 new 연산자 없이 호출하는 방법
- 빌트인 메서드를 사용하는 방법
- 의도적으로 암묵적 타입 변환을 이용하는 방법으로 타입을 변환한다.

### ✏️ 9.3.1 문자열 타입으로 변환

- `String` 생성자 함수를 `new` 연산자 없이 호출하기
- `Object.prototype.toString` 메서드를 사용하기
- 문자열 연결 연산자를 사용하기

```js
String(1); // "1"
String(NaN); // "NaN"

(1).toString(); // "1"
true.toString(); // "true"

1 + ""; // "1"
false + ""; // "false"
```

### ✏️ 9.3.2 숫자 타입으로 변환

- `Number` 생성자 함수를 `new` 연산자 없이 호출하기
- `parseInt`, `parseFloat` 함수를 사용하는 방법(문자열 -> 숫자만 가능)
- `+`단항 산술 연산자를 이용하는 방법
- `*`산술 연산자를 이용하는 방법

```js
Number("101"); // 101
Number(true); // 1

parseInt("102"); // 102

+"103"; // 103
+true; // 1
+false; // 0

"104" * 1; // 104
true * 1; // 1
```

### ✏️ 9.3.3 불리언 타입으로 변환

- Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
- !부정 논리 연산자를 두 번 사용하는 방법

```js
Boolean("string"); // true
!!"string"; // true
Boolean(""); // false
!!""; // false

Boolean(1); // true
!!1; // true
Boolean(0); // false
!!0; // false
Boolean(NaN); // false
!!NaN; // false

Boolean(null); // false
!!null; // false
Boolean(undefined); // false
!!undefined; // false

Boolean({}); // true
!!{}; // true
Boolean([]); // true
!![]; // true
```

## 📝 9.4 단축 평가

### ✏️ 9.4.1 논리 연산자를 사용한 단축 평가

논리곱,논리합 연산자의 표현식 평가 결과가 불리언 값이 아닐 수도 있다. 2개의 피연산자 중 어느 한쪽으로 평가된다.

평가가 완료된 시점에 평가한 피연산자를 반환한다. 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 단축 평가라 한다.

단축 평가를 이용해 `if` 문을 대체할 수 있다. 조건이 `true`인 경우에 값을 할당할 때는 논리곱 연산자를 활용하고 조건이 `false`인 경우에 값을 할당할 때는 논리합 연산자를 활용할 수 있다.

|  단축 평가 표현식   | 평가 결과 |
| :-----------------: | :-------: |
| true \|\| anything  |   true    |
| false \|\| anything | anything  |
|  true && anything   | anything  |
|  false && anything  |   false   |

```js
"cat" && "dog"; // "dog"
false && "dog"; // false

"cat" || "dog"; // "cat"
false || "dog"; // "dog"
```

```js
const done = true;
let message = "";

if (done) {
  message = "done";
}

const message = done && "done";
```

```js
const done = false;
let message = "";

if (!done) {
  message = "not-done";
}

const message = done || "not-done";
```

#### 💡 단축 평가가 유용하게 사용되는 상황

⚙️ 객체를 가리키기를 기대하는 변수가 `null` 또는 `undefined`가 아닌지 확인하고 프로퍼티를 참조할 때

객체를 가리키기를 기대하는 변수의 값이 `null` 또는 `undefined`인 경우 참조하면 타입 에러가 발생하는데 이때 단축 평가를 사용하면 에러가 발생하지 않는다.

```js
const elem = null;

const value = elem.value; // TypeError
const value = elem && elem.value; // null
```

⚙️ 함수가 매개변수에 기본값을 설정할 때

함수를 호출할 때 인수를 전달하지 않으면 매개변수에 `undefined`가 할당된다. 이때 단축 평가를 이용해 기본값을 설정하면 `undefined`로 인해 발생할 수 있는 에러를 방지할 수 있다.

```js
// 단축 평가로 기본값 설정
function getStringLength(str) {
  str = str || "";
  return str.length;
}

// ES6 기본값 설정
function getStringLength(str = "") {
  return str.length;
}
```

### ✏️ 9.4.2 옵셔널 체이닝 연산자

ES11에서 도입된 연산자로 좌항의 값이 `null` or `undefined`인 경우 `undefined`를 반환하고 아닌 경우 우항의 프로퍼티 참조를 이어간다. 해당 연산자가 도입되기 이전에는 논리곱 연산자를 사용해 `null` 또는 `undefined`인지 확인했다. 논리곱 연산자의 경우 Falsy 값인 `0`이나 `""`은 객체로 평가될 때도 있었다.

```js
const elem = null;

// 옵셔널 체이닝 연산자
const value = elem?.value; // undefined

// 논리곱 연산자
const value = elem && elem.value; // null
```

```js
const str = "";

// 좌항이 false로 평가된 순간 나머지 평가를 생략해 문자열의 길이를 참조하지 못한다.
const length = str && str.length; // ""

// 좌항의 값이 falsy 값이지만 null or undefined가 아니기 때문에 우항의 참조를 이어간다.
const length = str?.length; // 0
```

### ✏️ 9.4.3 null 병합 연산자

ES11에서 도입된 연산자로 좌항의 값이 null or undefined이면 우항의 값을 반환하고 이외에는 좌항의 값을 반환한다. 변수에 기본값을 설정할 때 유용한다. 해당 연산자가 도입되기 이전에는 논리합 연산자를 활용해 변수의 기본값을 설정했다. 하지만 만약에 0 또는 "" 도 유효한 값이라면 문제가 발생할 수 있다.

```js
const foo = null ?? "default"; // "default"

// 좌항의 값이 falsy 값이기 때문에 우항의 평가를 이어간다.
const foo = "" || "default"; // default

// 좌항의 값이 falsy 값이어도 null or undefined가 아니면 좌항의 값을 반환한다.
const foo = "" ?? "default"; // ""
```
