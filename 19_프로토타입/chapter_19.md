# 📕 19장 프로토타입

자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어다.

- 클래스 기반 객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 키워드인 `public`, `private`, `protected` 등이 없어서 객체지향 언어가 아니라고 오해를 받는다.
- 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있다.
- **자바스크립트를 이루고 있는 거의 모든 것이 객체다.** (원시 타입을 제외한 나머지 값)

## 📝 19.1 객체지향 프로그래밍

객체지향 프로그래밍은 여러 개의 독립적인 단위, 즉 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

- 실세계의 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작.
- 실체는 특징이나 성질을 나타내는 속성을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.
- 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화**라 한다.
- **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조** === **상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조** === 객체
- 객체의 **상태**를 나타내는 데이터와 상태 데이터를 조작하는 **동작**을 하나의 논리적인 단위로 묶어 생각한다. (상테 데이터 -> 프로퍼티, 동작 -> 메서드)
- 객체는 고유의 기능을 가진 독립적인 부품이지만 다른 객체와 관계성을 가질 수 있으며, 다른 객체와 메시지를 주고받거나 데이터를 처리할 수 있다.
- 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.

## 📝 19.2 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

- 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. (기존에 작성한 코드를 재사용)
- 코드의 재사용은 코드의 중복을 제거하고 개발 비용을 현저히 줄일 수 있는 잠재력이 있다.

### ✏️ 불필요한 중복 예시

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };

  const circle1 = new Circle(1);
  const circle2 = new Circle(2);

  console.log(circle1.getArea === circle2.getArea); // false
}
```

- 모든 객체가 radius 프로퍼티와 getArea 메서드를 갖는다.
- radius 프로퍼티의 값은 인스턴스마다 다르지만 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 중복으로 소유한다.
- 불필요한 메모리 낭비를 만들어 퍼포먼스에 악역향을 준다.
- 불필요한 중복을 제거하기 위해 프로토타입을 기반으로 상속을 구현할 수 있다.

### 프로토타입 기반 상속 예시

```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true
```

- Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입의 모든 프로퍼티와 메서드를 상속받는다.
- getArea 메서드를 Circle.prototype의 메서드로 할당해 Circle 생성자 함수가 생성한 모든 인스턴스가 상속받아 사용할 수 있다.
- radius 프로퍼티는 개별적으로 소유하고 getArea 메서드는 상속을 통해 공유하여 사용한다.

## 📝 19.3 프로토타입 객체

프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다.  
프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티를 제공한다. 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 사용할 수 있다.

- 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가진다. (내부 슬롯의 값은 프로토타입의 참조 혹은 null)
- 객체 생성 방식에 따라 `[[Prototype]]`의 프로토타입이 결정된다.
- 모든 프로토타입은 생성자 함수와 연결되어 있다.
- `[[Prototype]]` 내부 슬롯에 직접 접근할 수 없지만, `__proto__`접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.
- `constructor` 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.

### ✏️ `__proto__` 접근자 프로퍼티

**모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다.**

내부 슬롯과 내부 메서드는 직접적으로 접근하거나 호출할 수 있는 방법이 없다. 단 일부에 한하여 간접적으로 접근할 수 있는 수단을 제공한다. `__proto__` 역시 이러한 방법 중에 하나이며 다른 접근자 프로퍼티처럼 접근자 함수(`[[Get]]`, `[[Set]]`) 프로퍼티 어트리뷰트로 구성된 프로퍼티다. `__proto__`는 getter/setter 함수라 불리는 접근자 함수를 통해 `[[Prototype]]` 내부 슬롯의 값을 취득하거나 할당한다.

- 프로토타입에 접근할 때 => getter가 사용됨
- 새로운 프로토타입을 할당할 때 => setter가 사용됨

```js
const obj = {};
const parent = { x: 1 };

// getter
obj.__proto__;

// setter
obj.__proto__ = parent;
```

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 것이 아니라 `Object.prototype`의 프로퍼티이고, 모든 객체는 상속을 통해 사용할 수 있다.

```js
const person = { name: lee };

console.log(person.hasOwnProperty("__proto__")); // false
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: f, enumerable: false, configurable: true}

console.log({}.__proto__ === Object.prototype); // true
```

`[[Prototype]]` 내부 슬롯의 값에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로퍼티 체인이 생성되는 것을 방지하기 위해서다.

```js
const parent = {};
const child = {};

parent.__proto__ = child;
child.__proto__ = parent; // Error
```

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. (검색 방향이 한쪽으로만 흘러가야 한다) 순환 참조를 하게되면 프로토타입 체인 종점이 존재하지 않아서 무한 루프에 빠진다.

`__proto__` 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었다. 하지만 일부 브라우저에서 `__proto__`를 지원하기 때문에 호환성을 고려해 ES6에서 표준으로 채택했다. 하지만 코드 내에서 `__proto__` 접근자 프로퍼티를 사용하는 것은 권장하지 않는다. 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.(`Object.prototype`을 상속받지 않는 객체를 생성할 수도 있기 때문)

```js
const obj = Object.create(null);
console.log(obj.__proto__); // undefined
```

프로토타입 참조를 취득하고 싶은 경우에는 `__proto__` 대신 `Object.getPrototypeOf`를 사용하고 프로토타입을 교체하고 싶은 경우에는 `Object.setPrototypeOf` 메서드를 사용할 것을 권장한다.

### ✏️ 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.**

```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty("prototype"); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwenProperty("prototype"); // false
```

생성자 함수로서 호출할 수 없는 함수(non-constructor)인 화살표 함수, ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

생성자 함수로 호출하기 위해 정의하지 않는 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 의미가 없다.

**모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 동일한 프로토타입을 가리키지만 사용하는 주제가 다르다.**

|    구분     |     소유      |       값        |  사용 주체  |                             사용 목적                              |
| :---------: | :-----------: | :-------------: | :---------: | :----------------------------------------------------------------: |
| `__proto__` |   모든 객체   | 프로토타입 참조 |  모든 객체  |      객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용       |
| `prototype` | `constructor` | 프로토타입 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용 |

```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("lee");

// 둘은 동일한 프로토타입을 가진다.
console.log(Person.prototype === me.__proto__); // true;
```

### ✏️ 프로토타입의 `constructor` 프로퍼티와 생성자 함수

모든 프로토타입은 `constructor` 프로퍼티를 갖는다. 이 `constructor` 프로퍼티는 `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.

```js
function Person(name) {
  this.name = name;
}

const me = new Person("lee");

me.constructor === Person; // => true
```

## 📝 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 `constructor` 프로퍼티에 의해 생성자 함수와 연결된다.

```js
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function("a", "b", "return a + b");
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 함수는 Person이다.
const me = new Person("lee");
console.log(me.constructor === Person); // true
```

리터럴 표기법으로 생성한 객체도 프로토타입이 존재하지만 프로토타입의 `constructor` 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

```js
const obj = {};

console.log(obj.constructor === Object); // true
```

위 예시에서 `obj` 함수는 객체 리터럴에 의해 생성된 객체이지만 `Object` 생성자 함수와 `constructor` 프로퍼티로 연결되어 있다.

ECMAScript 사양에 적혀 있는 `Object` 생성자 함수에 인자를 전달하지 않거나 `undefined` 또는 `null`을 인수로 전달하면 내부적으로 추상 연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성한다.

```
추상연산?

ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것.
ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사 코드라고 이해하자.
```

객체 리터럴이 평가될 때는 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.

`Object` 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산을 호출하여 빈 객체를 생성하는 점에서 비슷하나 `new.target`의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르다. 따라서 객체 리터럴로 생성한 함수는 `Object` 생성자 함수로 생성한 객체가 아니다.

리터럴로 생성된 객체도 상속을 위해 프로토타입이 필요하기 때문에 가상적인 생성자 함수를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 떄문이다.

**프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.**

리터럴 표기법(객체, 함수, 배열, 정규 표현식)에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니지만 큰 틀에서 생각해보면 본직적인 면에서 큰 차이는 없다. 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없다.

## 📝 19.5 프로토타입의 생성 시점

```
Object.create와 클래스로 생성한 객체도 생성자 함수와 연결되어 있다.
```

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**

생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트 기본 빌트인 생성자 함수로 구분된다.

### ✏️ 사용자 정의 생성자 함수와 프로토타입 생성 시점

**생성자 함수로서 호출할 수 있는 함수(`constructor`)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.**  
화살표 함수, 축약 표현으로 함수는 프로토타입이 생성되지 않는다.

```js
console.log(Person.prototype); // {constructor: f}

// 생성자 함수
function Person(name) {
  this.name = name;
}

// 화살표 함수
const Person2 = (name) => {
  this.name = name;
};

console.log(Person2.prototype); // undefined
```

함수 선언문은 언제나 런타임 이전에 먼저 실행된다. 어떤 코드보다 먼저 평가되어 함수 객체가 되고 프로토타입도 같이 생성된다. 생성된 프로토타입은 생성자 함수 `prototype` 프로퍼티에 바인딩 된다.

- 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체다.
- 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다.(`Object.prototype`)

### ✏️ 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.

- 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.
- 생성되 프로토타입은 빌트인 생성자 함수의 `prototype` 프로퍼티에 바인딩된다.

객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. **이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당된다.** 생성된 객체는 프로토타입을 상속받는다.

## 📝 19.6 객체 생성 방식과 프로토타입의 결정

**객체 생성 방법**

- 객체 리터럴
- `Object` 생성자 함수
- 생성자 함수
- `Object.create` 메서드
- 클래스(ES6)

생성 방식마다 세부적인 차이점은 존재하지만 추상 연산에 의해 생성된다는 공통점이 있다.

**추상 연산**

- 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달 받는다.
- 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다.
- 빈 객체를 생성한 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가한다.
- 인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당하고 생성한 객체를 반환한다.

프로토타입은 추상 연산에 전달되는 인수에 의해 결정된다. 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

### ✏️ 객체 리터럴에 의해 생성된 객체의 프로토타입

```js
const obj = { x: 1 };

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상연산을 호출한다. 이때 추상 연산에 전달되는 프로토타입은 `Object.prototype`이다.

- `Object.prototype`을 상속받는다.
- `Object.prototype`의 프로퍼티와 메서드를 사용할 수 있다.

### ✏️ Object 생성자 함수에 의해 생성된 객체의 프로토타입

```js
const obj = new Object();
obj.x = 1;

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

`Object` 생성자 함수를 인수 없이 호출하면 빈 객체가 생성되고 추상 연산을 호출한다. 이때 추상 연산에 전달되는 프로토타입은 `Object.prototype`이다.

- 객체 리터럴과의 차이점은 프로퍼티를 추가하는 방식에 있다.
- 객체 리터럴은 리터럴 내부에 프로퍼티를 추가하지만 `Object` 생성자 함수는 빈 객체를 생성한 이후 프로퍼티를 추가한다.

### ✏️ 생성자 함수에 의해 생성된 객체의 프로토타입

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi My name is ${this.name}`);
};

const me = new Person("lee");
const you = new Person("kim");

me.sayHello(); // Hi My name is lee
you.sayHello(); // Hi My name is kim
```

new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 추상 연산이 호출된다. 이때 추상 연산에 전달되는 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체다.

- 사용자 정의 생성자 함수와 더불에 생성된 프로토타입의 프로퍼티는 `constructor`뿐이다.
- 사용자 정의 생성자 함수의 프로토타입에 프로퍼티를 추가/삭제할 수 있다.
- 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.
- 사용자 정의 생성자 함수의 프로토타입의 프로토타입은 `Object.prototype`이다.

## 📝 19.7 프로토타입 체인

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi My name is ${this.name}`);
};

const me = new Person("lee");

console.log(me.hasOwnProperty("name")); // true
Object.getPrototypeOf(me) === Person.prototype; // true
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
```

예제를 확인하면 `me` 객체가 `Object.prototype`의 `hasOwnProperty()` 메서드를 사용할 수 있다고 나온다. 그 이유는 `me` 객체가 `Person.prototype` 뿐만 아니라 `Object.prototype`도 상속받았기 때문이다.

**자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.**

**자바스크립트 엔진의 메서드 검색 순서**

1. 메서드를 호출한 객체에 해당 메서드가 존재하는지 검색한다. 메서드가 존재하지 않는다면 프로토타입 체인을 따라 `[[Prototype]]` 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 메서드를 검색한다. (`me` 객체)
2. 상위 프로토타입에도 메서드가 존재하지 않는다면 프로토타입 체인을 따라 `[[Prototype]]` 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 메서드를 검색한다. (`Person.prototype`)
3. `Object.prototype`에 메서드가 존재하면 메서드를 호출한다. (메서드의 `this`에는 `me` 객체가 바인딩된다.)
4. 프로토타입 체인의 종점에도 메서드가 존재하지 않다면 `undefined`를 반환한다. (에러는 발생하지 않는다)

- `Object.prototype`을 프로토타입 체인의 종점이라 한다.
- `Object.prototype`의 프로토타입(`[[Prototype]]`)의 내부 슬롯의 값은 `null`이다.
- 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘
- 스코프 체인은 식별자 검색을 위한 메커니즘
- 스코프 체인과 프로토타입 체인은 별도로 동작하지 않고 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다.

## 📝 19.8 오버라이딩과 프로퍼티 섀도잉

```js
const Person = (function () {
  // 생성자 함수
  fucntion Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`hi my name is ${this.name}`);
  }

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person("lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`hey my name is ${this.name}`);
}

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // hey my name is lee

// 인스턴스 메서드를 삭제한다.
delete me.sayHello;

// 인스턴스 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // hi my name is lee
```

프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 한다.

- 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다.
- 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩했고 프로토타입 메서드 sayHello는 가려진다.
- 상속 관계에 의해 프로퍼티가 가려지는 현상을 **프로퍼티 섀도잉**이라 한다.
- 메서드를 삭제할 때 인스턴스 메서드가 삭제된다.
- 하위 객체를 통해 프로토타입 프로퍼티를 변경, 삭제하는 것은 불가능하다.

```
오버라이딩

상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

오버로딩

함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다.
자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.
```

```js

```
