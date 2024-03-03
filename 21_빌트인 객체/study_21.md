# 📕 21장 빌트인 객체

## 📝 21.1 자바스크립트 객체의 분류

#### ✅ 표준 빌트인 객체

- ECMAScript 사양에 정의된 객체로, 애플리케이션 전역의 공통 기능을 제공한다.
- JS 실행 환경과 관계없이 언제나 사용할 수 있다.
- 전역 객체의 프로퍼티로서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.

#### ✅ 호스트 객체

- ECMAScript 사양에 정의되어 있지 않지만 JS의 실행 환경(브라우저 or Node.js)에서 추가로 제공하는 객체.
- 브라우저 환경에서 제공하는 호스트 객체 => `DOM`, `BOM`, `Canvas`, `XMLHttpRequest`, `fetch`, `requestAnimationFrame`, `SVG`, `Web Storage`, `Web Component`, `Web Worker` 등.
- Node.js 환경에서는 고유의 API를 호스트 객체로 제공한다.

#### ✅ 사용자 정의 객체

- 사용자가 직접 정의한 객체.

## 📝 21.2 표준 빌트인 객체

JS는 40여 개의 표준 빌트인 객체를 제공하는데 `Math`, `Reflect`, `JSON`을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.  
생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 `prototype` 프로퍼티에 바인딩된 객체다.

표준 빌트인 객체의 `prototype` 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공하며 표준 빌트인 객체는 인스턴스 없이 호출 가능한 빌트인 정적 메서드를 제공한다.

```js
const numObj = new Number(1.5);

/// Number.prototype의 프로토타입 메서드
console.log(numObj.toFixed()); // 2

// Number의 정적 메서드
console.log(Number.isInteger(0.5)); // false
```

## 📝 21.3 원시값과 래퍼 객체

JS는 원시값에 마침표 표기법으로 접근을 하면 연관된 객체를 생성하여 생성된 객체(`래퍼 객체`)로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.

- 원시값에 마침표 표기법으로 접근한다.
- 래퍼 객체를 생성해 내부 슬롯에 원시값을 할당한다.
- 처리가 종료되면 내부 슬롯에 할당된 원시값을 원래의 상태로 되돌린다.
- 래퍼 객체는 가비지 컬렉션의 대상이 된다.

문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다.  
따라서 `String`, `Number`, `Boolean` 생성자를 `new` 연산자와 함께 호출하여 생성할 필요가 없고 권장하지도 않는다.

`null`, `undefined`는 래퍼 객체를 생성하지 않아서 객체처럼 사용하면 에러가 발생한다.

## 📝 21.4 전역 객체

전역 객체는 코드가 실행되기 이전에 JS 엔진에 의해 어떤 객체보다 먼저 생성되는 특수한 객체로, 어떤 객체에도 속하지 않은 최상위 객체다.

JS 환경에 따라 지칭하는 이름이 다르다. -> 브라우저: [`window`, `self`, `this`, `frames`], Node.js: `global`

```
💡 globalThis

   실행 환경에 따라 다르게 불리던 전역 객체의 식별자를 통일한 식별자로 ES11에서 도입되었다.
   ECMAScript 표준 사양을 준수하는 모든 환경에서 사용할 수 있다.
```

전역 객체는 표준 빌트인 객체, 호스트 객체, `var` 키워드로 선언한 전역 변수, 전역 함수를 프로퍼티로 갖는다.

전역 객체가 최상위 객체라는 것은 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말한다.

#### 💡 전역 객체의 특징

- 전역 객체는 개발자가 의도적으로 생성할 수 없다.
- 전역 객체의 프로퍼티를 참조할 때 window(global)를 생략할 수 있다.
- 전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
- JS 실행환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다.
- `var` 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 전역 함수는 전역 객체의 프로퍼티가 된다.
- `let`, `const` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
  - window.변수와 같이 접근할 수 없다.
  - `let`, `const` 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(**전역 렉시컬 환경의 선언적 환경 레코드**) 내에 존재하게 된다.
- 브라우저 환경의 모든 JS 코드는 하나의 전역 객체를 공유한다. -> 분리되어 있는 JS 코드가 하나의 전역 객체를 공유한다.

### ✏️ 빌트인 전역 프로퍼티

빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. -> 어플리케이션 전역에서 사용하는 값을 제공한다.

#### ✅ Infinity

무한대를 나타내는 숫자값을 갖는다.

```js
console.log(window.Infinity === Infinity); // true

console.log(3 / 0); // Infinity
console.log(-3 / 0); // -Infinity

console.log(typeof Infinity); // number
```

#### ✅ NaN

숫자가 아님을 나타내는 숫자값 `NaN`을 갖는다. `Number.NaN` 프로퍼티와 같다.

```js
console.log(window.NaN); // NaN

console.log(Number('sdf')); // NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN); // number
```

#### ✅ undefined

원시 타입 undefined를 값으로 갖는다.

```js
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### ✏️ 빌트인 전역 함수

어플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.

#### ✅ eval

JS 코드를 나타내는 문자열을 인수로 전달받는다.  
전달받은 인수가 표현식이라면 코드를 런타임에 평가하여 값을 생성하고 표현식이 아닌 문이라면 코드를 런타임에 실행한다. 만약 인수가 여러개의 문으로 이루어져 있다면 모든 문을 실행한다.

```js
eval('2 - 1;'); // 1
eval('var x = 10;'); // undefined

console.log(x); // 10

// 객체 리터럴과 함수는 반드시 괄호로 감싼다.
const obj = eval('({ a: 1 })');
console.log(obj); // { a: 1 }

const func = eval('(function() { return 1; })');
console.log(func()); // 1

// 여러개의 문으로 이루어져 있다면 모든 문을 실행한 다음 마지막 결과값을 반환한다.
eval('1 + 2; 3 + 4;'); // 7
```

함수가 호출되면 런타임 이전에 먼저 함수 몸체 내부의 모든 선언물을 모두 실행하고 그 결과를 스코프에 등록한다.

- 예제의 `eval` 함수가 호출되는 시점에는 이미 foo 함수의 스코프가 존재한다.
- `eval` 함수는 기존의 스코프를 런타임에 동적으로 수정한다. -> 함수 스코프에 등록되어 있는 전역 변수 `x`를 함수 내부에서 동적으로 변경?
- `eval` 함수에 전달된 코드는 스코프에 이미 존재하는 코드처럼 동작한다. -> `eval` 함수가 호출된 `foo` 함수의 스코프에서 실행된다.
- 엄격 모드에서는 기존의 스코프를 수정하지 않고 자체적인 스코프를 생성한다.
- 인수로 전달받은 문자열 코드가 `let`, `const` 키워드를 사용한 변수 선언문이라면 암묵적으로 엄격 모드가 적용된다.

```js
const x = 1;

function foo() {
  eval('var x = 2;');
  console.log(x); // 2
}

foo();
console.log(x); // 1

-------------------------

const x = 1;

function foo() {
  'use strict';

  eval('var x = 2; console.log(x);'); // 2
}

foo();
console.log(x); // 1

-------------------------

const x = 1;

function foo() {
  eval('var x = 2; console.log(x);'); // 2

  eval('const x = 3; console.log(x);'); // 3

  console.log(x); // 2
}

foo();
console.log(x); // 1
```

- `eval` 함수를 통해 사용자로부터 입력받은 콘텐츠를 실행하는 것은 보안에 취약하다.
- JS 엔진에 의해 최적화가 수행되지 않아 처리 속도가 느리다.
- `eval` 함수의 사용은 금지해야 한다.

#### ✅ isFinite

전달받은 인수가 정상적인 유한수인지 검사하여 불리언 값을 반환한다.

- 전달받은 인수가 숫자가 아닌 경우 숫자로 타입을 변환해 검사한다.
- `NaN`은 `false`를 반환한다.
- `null`은 `true`를 반환한다.

#### ✅ isNan

전달받은 인수가 NaN인지 검사하여 결과를 불리언 값으로 반환한다.

- 전달받은 인수가 숫자가 아닌 경우 숫자로 타입을 변환해 검사한다.

#### ✅ parseFloat

전달받은 문자열 인수를 부동 소수점 숫자(실수)로 해석하여 반환한다.

- 공백으로 구분된 문자열은 첫 번째 문자열만 반환한다.
  - 첫 번째 문자열을 숫자로 반환할 수 없다면 NaN을 반환한다.
  - 앞뒤 공백은 무시된다.

```js
parseFloat('2.22'); // 2.22
parseFloat('20 30 40'); // 20
parseFloat('asd 40'); // NaN
parseFloat(' 10 '); // 10
```

#### ✅ parseInt

전달받은 문자열 인수를 정수로 해석하여 반환한다.

- 전달받은 인수가 문자열이 아니라면 문자열로 변환한뒤 정수로 해석하여 반환한다.
- 두번째 인수로 진법을 나타내는 기수를 전달할 수 있다.
- 기수가 전달되면 문자열을 전달된 기수로 해석하고 결과를 다시 10진수로 반환한다.
- 기수를 지정하지 않더라도 전달되는 문자열이 `'0x'` or `'0X'`로 시작하는 16진수 리터럴이면 16진수로 해석하고 10진수 정수로 반환한다. -> 2진수, 8진수 리터럴은 해석하지 못한다.
- ES5 이전까지는 `'0'`으로 시작하는 숫자를 8진수로 해석했다. -> 하지만 사용은 금지했음.
- 전달된 문자열이 해당 지수로 변환될 수 없다면 `NaN`을 반환한다.
- 전달된 문자열이 두 번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자를 만나면 이 문자와 계속되는 문자들은 모두 무시되고 해석된 정수값만 반환한다.
- 전달된 문자열에 공백이 있다면 첫 번째 문자열만 해석하여 반환하고 앞뒤 공백은 무시한다. -> 첫 번째 문자열을 숫자로 해석할 수 없다면 `NaN`을 반환한다.

```js
parseInt('1'); // 1
parseInt('10', 2); // 2
parseInt('10', 16); // 16
parseInt('0xf'); // 15
parseInt('A0'); // NaN
parseInt('20', 2); // NaN
parseInt('1A0'); // 1
parseInt('102', 2); // 2
```

기수를 지정하여 해당 기수의 문자열로 변환하고 싶을 경우 `Number.prototype.toString` 메서드를 사용한다.

```js
const x = 15;

const y = x.toString(2); // '1111'
parseInt(y, 2); // 15

const f = x.toString(16); // 'f'
parseInt(f, 16); // 15
```

#### ✅ encodeURI / decodeURI

`encodeURI` 함수는 완전한 `URI`를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.

`decodeURI` 함수는 `URI`를 인수로 받아 이스케이프 처리 이전으로 인코딩한다.

`URI`: 인터넷에 있는 자원을 나타내는 유일한 주소를 나타내고 하위 개념으로 `URL`, `URN`이 있다.

- **인코딩**: URI 문자들을 이스케이프 처리하는 것.
- **이스케이프 처리**: 네트워크를 통해 정보를 공유할 때 어떤 시스템이든 읽을 수 있는 아스키 문자 셋으로 변환하는 것.
- **UTF-8 특수 문자**: 1문자당 1~3바이트
- **UTF-8 한글**: 1문자당 3바이트
- 특수문자 공백 -> `%20`
- 한글 '가' -> `%EC%9E%90`
- `URI` 문법 형식 표준 RFC3986에 따르면 아스키 문자 셋으로만 구성되어야 하고 한글을 포함한 대부분의 외국어, 아스키 문자 셋에 정의되지 않은 특수 문자는 `URL`에 포함될 수 없다.
- `URL` 내에서 의미를 갖는 특수문자, 올 수 없는 문자(한글, 공백), 시스템에 의해 해석될 수 있는 문자(<,>)를 이스케이프 처리하여 발생할 수 있는 문제를 예방하기 위해 이스케이프 처리가 필요함.
- 알파벳, 0~9의 숫자, **[-, \_, ., !, ~, \*, `, ()]** 문자는 이스케이프 처리에서 제외된다.

```js
const uri = 'http://example.com?name=오명석&job=programer&teacher';
const encode = encodeURI(uri);
const decode = decodeURI(encode);

console.log(encode); // http://example.com?name=%EC%98%A4%EB%AA%85%EC%84%9D&job=programer&teacher
console.log(decode); // http://example.com?name=오명석&job=programer&teacher
```

#### ✅ encodeURIComponent / decodeURIComponent

`encodeURIComponent` 함수는 인수로 전달된 문자열을 `URI`의 구성요소인 쿼리 스트링의 일부로 간주해 쿼리 스트링 구분자로 사용되는 **[=, ?, &]** 까지 인코딩한다.

`encodeURI` 함수는 인수로 전달된 문자열을 완전한 `URI`로 간주해 쿼리 스트링 구분자로 사용되는 **[=, ?, &]** 은 인코딩하지 않는다.

```js
const uriComp = 'name=오명석&job=programer&teacher';
const encode = encodeURIComponent(uriComp); // name%3D%EC%98%A4%EB%AA%85%EC%84%9D%26job%3Dprogramer%26teacher
const decode = decodeURIComponent(encode); // name=오명석&job=programer&teacher

console.log(encode);
console.log(decode);
```

### ✏️ 암묵적 전역

선언하지 않은 전역 변수에 할당하면 참조 에러가 발생할 것 같지만 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 되기 때문에 해당 식별자는 선언된 전역 변수처럼 동작한다.

선언되지 않은 변수에 값을 할당하면 JS 엔진은 변수에 값을 할당하기 위해 스코프 체인을 통해 선언된 변수인지 확인하는데 스코프 어디에서도 해당 식별자를 찾지 못하면 참조 에러가 발생해야 하지만 JS 엔진은 `window.변수 = 할당값`으로 해석하여 전역 객체에 프로퍼티를 동적으로 생성한다. 이를 **암묵적 전역**이라 한다.

- 암묵적 전역으로 추가된 프로퍼티는 변수가 아니므로 변수 호이스팅이 발생하지 않는다.
- 변수가 아닌 프로퍼티는 `delete` 연산자로 삭제할 수 있지만 전역 변수는 프로퍼티이지만 `delete` 연산자로 삭제할 수 없다.

```js
console.log(x); // undefined
console.log(y); // ReferenceError: y is not defined

var x = 10;

function foo() {
  y = 20;
}
foo();

console.log(x + y); // 30

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined
```
