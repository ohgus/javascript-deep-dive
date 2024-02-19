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

## 📝 17.2 생성자 함수

### ✏️ 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

객체를 객체 리터럴로 생성하는 방식은 한번에 하나의 객체만을 생성하기 떄문에 동일한 프로퍼티를 갖는 여러개의 객체를 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 해서 비효율적이다.

### ✏️ 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수를 객체를 생성하기 위한 하나의 템플릿처럼 사용하여 여러 개의 객체를 간편하게 생성할 수 있다.

```js
// 생성자 함수
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.getFullName = () => {
    return `${this.firstName} ${this.lastName}`;
  };
}

// 인스턴스 생성
const person1 = new Person('oh', 'ms');
const person2 = new Person('lee', 'ms');

console.log(person1.getFullName()); // oh ms
console.log(person2.getFullName()); // lee ms
```

```
💡`this`

`this`는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수로 `this`가 가리키는 값(바인딩)은 함수 호출 방식에 따라 동적으로 결정된다.

호출 방식에 따른 `this` 바인딩

- 일반 함수로서 호출 -> 전역 객체
- 메서드로서 호출 -> 메서드를 호출한 객체
- 생성자 함수로서 호출 -> 생성자 함수가 생성한 인스턴스
```

생성자 함수는 객체를 생성하는 함수지만 클래스 기반 객체지향 언어의 생성자 함수와 다르게 정해진 형식이 없고 일반 함수와 동일하게 정의하고 `new` 연산자와 함께 호출해야 생성자 함수로서 동작한다. `new` 연산자 없이 호춣되면 일반 함수로서 동작한다.

### ✏️ 17.2.3 생성자 함수의 인스턴스 생성 과정

생성자 함수의 역할은 구조가 동일한 인스턴스를 생성하기 위한 템플릿으로서 동작해 인스턴스를 생성하고 인스턴스를 초기화하는 것이다.
인스턴스를 생성하는 것은 필수고 초기화는 옵션이다.

JS 엔진은 인스턴스 반환문이 없어도 `new` 연산자와 함께 생성자 함수를 호출하면 암묵적으로 인스턴스를 생성하고 반환한다.

#### ✅ 1. 인스턴스 생성과 this 바인딩

아래 과정은 런타임 이전에 실행된다.

1. 암묵적으로 빈 객체(인스턴스)를 생성한다.
2. 인스턴스가 this에 바인딩된다.

```
💡바인딩

식별자와 값을 연결하는 과정

- 변수는 변수 이름과 확보된 메모리 공간의 주소를 연결
- this는 this가 가리킬 객체를 연결
```

#### ✅ 2. 인스턴스 초기화

아래 과정은 개발자가 직접 기술한다.

런타임에 `this`에 바인딩되어 있는 인스턴스를 초기화한다. 프로퍼티나 메서드를 추가하고 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.

#### ✅ 3. 인스턴스 반환

생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this`가 암묵적으로 반환된다.

- `this`가 아닌 다른 객체를 명시적으로 반환하면 `this`는 반환되지 않고 명시한 객체가 반환된다.
- `this`가 아닌 원시값을 명시적으로 반환하면 원시값의 반환은 무시되고 `this`가 반환된다.

생성자 함수 내부에 `this`가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하기 때문에 `return` 문을 반드시 생략하자.

### ✏️ 17.2.4 내부 메서드 [[Call]]과 [[Construct]]

함수는 객체이므로 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있어 일반 객체와 동일하게 동작할 수 있다.

```js
function foo() {}

foo.prop = 10;

foo.method = () => {
  console.log(this.prop);
};

foo.method(); // 10
```

함수와 일반 객체의 차이점은 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다는 점이다. 또한 함수는 함수로서 동작하기 위한 `[[Environment]]`, `[[FormalParameters]]` 등의 내부 슬롯과 `[[Call]]`, `[[Construct]]` 같은 내부 메서드를 추가로 가지고 있다.

함수가 일반 함수로서 호출되면 `[[Call]]`이 호출되고 생성자 함수로서 호출되면 `[[Construct]]`가 호출된다.

내부 메서드 `[[Call]]`을 갖는 함수 객체를 `callable`이라 하고, 내부 메서드 `[[Construct]]`를 갖는 함수 객체를 `constructor`, `[[Construct]]`를 갖지 않는 함수 객체를 `non-constructor`라고 부른다. 함수는 호출할 수 있는 객체이므로 모두 `callable`이며 생성자 함수로 호출할 수 있는 함수를 `constructor` 생성자 함수로 호출할 수 없는 함수를 `non-constructor`라고 한다.

### ✏️ 17.2.5 constructor와 non-constructor의 구분

JS 엔진은 함수의 정의 방식에 따라서 constructor와 non-constructor를 구분한다.

- constructor: 함수 선언문, 함수 표현식, 클래스
- non-constructor: 메서드, 화살표 함수
  - ECMAScript 사양에서 인정하는 메서드의 범위가 일반적인 메서드보다 좁다는 것에 주의하자. => ES6의 축약 표현만 메서드로 인정
- 일반 함수로 정의한 함수에 new 연산자를 사용해 호출하면 생성자 함수처럼 동작할 수 있으니 주의하자.

```js
// constructor

function foo() {}
const bar = function () {};
const baz = {
  // 일반 함수로 정의한 함수는 메서드로 인정하지 않는다.
  x: function () {},
};

new foo(); // foo{}
new bar(); // bar{}
new baz.x(); // x{}

// non-constructor

const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

const obj = {
  x() {},
};

new obj.x(); // TypeError: obj.x is not a constructor
```

### ✏️ 17.2.6 new 연산자

일반 함수와 생성자 함수의 특별한 형식적 차이는 없다. `new` 연산자를 사용해 함수를 호출하면 해당 함수의 `[[Construct]]`가 호출되면서 생성자 함수로 동작한다. 이때 함수는 `constructor`이어야 한다.

`new` 연산자 없이 생성자 함수를 호출하면 일반 함수로서 동작하게 되고 함수 내부의 `this`가 전역 객체 `window`를 가리키게 되어 함수 내부의 프로퍼티와 메서드가 전역 객체의 프로퍼티와 메서드가 된다.

일반 함수와 생성자 함수를 구분하기 위해 생성자 함수는 파스칼 케이스로 명명한다.

### ✏️ 17.2.7 new.target

생성자 함수가 `new` 연산자 없이 호출되는 것을 방지하기 위한 컨벤션을 사용한다 해도 실수는 발생할 수 있다. 이런 위험성을 방지하기 위해 ES6부터 `new.target`을 지원한다.

`new.target`은 this와 유사하게 `constructor`인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다. (IE는 지원하지 않는다)

`new.target`은 함수를 `new` 연산자를 사용해 호출하면 함수 자신을 가리키고 일반 함수로서 `new` 연산자 없이 호출되면 `undefined`가 되어 생성자 함수로서 호출됬는지 확인할 수 있다.

```js
function Person(age, name) {
  if (!new.target) {
    return new Person(age, name);
  }

  this.age = age;
  this.name = name;
  this.sayHi = () => {
    return `Hi! my name is ${this.name} i am ${this.age} years old`;
  };
}

const person = Person(28, 'oms');
console.log(person.sayHi()); // Hi! my name is oms i am 28 years old
```

new.target을 사용할 수 없는 환경이라면 스코프 세이프 생성자 패턴을 사용할 수 있다.

```js
function Person(age, name) {
  // new 연산자와 호출되지 않았다면 this는 window를 가리킨다.
  if (!(this instanceof Person)) {
    return new Person(age, name);
  }

  this.age = age;
  this.name = name;
  this.sayHi = () => {
    return `Hi! my name is ${this.name} i am ${this.age} years old`;
  };
}

const person = Person(28, 'oms');
console.log(person.sayHi()); // Hi! my name is oms i am 28 years old
```

대부분의 빌트인 생성자 함수는 `new` 연산자와 함께 호출되었는지 확인한 후 적절한 값을 반환한다.

- `Object`, `Function` 생성자 함수는 `new` 연산자 없이 호출해도 `new`연산자를 호출했을 때와 동일하게 동작한다.
- `String`, `Number`, `Boolean` 생성자 함수는 `new` 연산자와 호출하면 `String`, `Number`, `Boolean` 객체를 반환하지만 `new` 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다.
