# 📕 20장 strict mode

## 📝 20.1 strict mode란?

```js
function foo() {
  x = 10;
}

foo();

console.log(x); // 10
```

위 예시 코드를 보면 `foo` 함수 내부에서는 선언되지 않은 변수 `x`를 할당하고 있고, 전역에서는 `x`를 참조하고 있다. 이때 js는 스코프 체인을 통해서 `x`를 찾기 시작하는데 처음에 foo에서 `x`를 검색해 찾지 못하면 상위 스코프(전역)으로 이동하여 `x`를 검색한다. 전역에서도 `x`가 존재하지 않기 때문에 `ReferenceError`를 발생시킬 것 같지만 JS가 `암묵적 전역`으로 전역 객체에 `x`를 동적 생성하여 전역 변수처럼 사용할 수 있다.

개발자의 의도와 상관없이 발생한 암묵적 전역은 오류를 발생할 원인이 될 가능성이 크기 때문에 반드시 `let`, `var`, `const` 키워드를 사용해 변수를 선언하고 사용해야 한다.  
이러한 문제 외에도 오타나 문법적 오류로 인한 실수는 언제나 발생할 수 있어 안정적인 코드를 생산하기 위해서 근본적인 해결이 필요하다. -> **개발 환경 세팅**  
이를 위해서 ES5부터 `strict mode`가 추가되었고 `Eslint`를 이용해도 `strict mode`와 유사한 효과를 얻을 수 있다. -> `Eslint`는 `strict mode`의 효과에 더해 코딩 컨벤션을 정의해 강제할 수 있다.

## 📝 20.2 strict mode의 적용

전역의 선두 혹은 함수 몸체의 선두에 `'use strict';`를 추가해 `strict mode`를 사용할 수 있다.

```js
'use strict';

function foo() {
  x = 10;
}

foo();
```

![alt text](public/image1.png)

## 📝 20.3 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 `strict mode`는 스크립트 단위로 적용된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      'use strict';
      x = 10; // ReferenceError
    </script>
    <script>
      y = 10; // 에러가 발생하지 않는다.
    </script>
  </body>
</html>
```

- `strict mode`는 스크립트 단위로 적용되기 때문에 다른 스크립트에 영향을 주지 않는다.
- `strict mode`와 `non-strict mode`를 혼용해서 사용하는 것은 오류를 발생시킬 수 있다.
- 서드파티 라이브러리를 사용하는 경우 `non-strict mode`인 경우가 있어 전역 `strict mode`를 적용하는 것은 바람직하지 않다.

  - 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸 스코프를 구분하고 즉시 실행 함수 선두에 `strict mode`를 적용한다.

  ```js
  (function () {
    'use strict';

    /// Do something...
  })();
  ```

## 📝 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

함수 단위로 `strict mode`를 적용할 수 있지만 어떤 함수는 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않으며 모든 함수에 일일이 적용하는 것은 번거로운 일이다.  
`strict mode`가 적용된 함수가 참조할 외부의 컨텍스트에 `strict mode`를 적용하지 않는다면 문제가 발생할 수 있다.

```js
(function () {
  // non-strict mode
  var let = 10; // no error

  function foo() {
    'use strict';

    let = 20; // SyntaxError
  }

  foo();
})();
```

## 📝 20.5 strict mode가 발생시키는 에러

### ✏️ 암묵적 전역

선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.

### ✏️ 변수, 함수, 매개변수의 삭제

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

```js
(function () {
  'use strict';

  var x = 1;
  delete x; // SyntaxError

  function foo(a) {
    delete a; // SyntaxError
  }

  delete foo; // SyntaxError
})();
```

### ✏️ 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

```js
(function () {
  'use strict';

  // SyntaxError
  function foo(x, x) {
    return x + x;
  }

  console.log(foo(1, 2));
})();
```

### ✏️ with 문의 사용

`with` 문을 사용하면 `SyntaxError`가 발생한다.

```js
(function () {
  'use strict';

  // SyntaxError
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

#### 💡 with 문

- 전달된 객체를 스코프 체인에 추가한다.
- 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간결해지지만 성능과 가독성이 나빠지는 문제가 있다.

## 📝 20.6 strict mode 적용에 의한 변화

### ✏️ 일반 함수의 this

`strict mode`에서 함수를 일반 함수로서 호출하면 `this`에 `undefined`가 바인딩된다.  
생성자 함수가 아닌 일반 함수 내부에서는 `this`를 사용할 필요가 없기 때문이다. (에러는 발생하지 않음)

```js
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

### ✏️ arguments 객체

`strict mode`에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않는다.

```js
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 자할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
