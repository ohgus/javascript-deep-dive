# 📕 22장 this

## 📝 22.1 this 키워드

객체의 메서드는 자신이 속한 객체의 상태를 참조하고 변경할 수 있어야 한다. -> 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

```js
const circle = {
  radius: 6,
  getDiameter() {
    return 2 * circle.radius; // 메서드가 호출되는 시점에는 이미 자신이 속한 객체가 평가되고 식별자에 할당되어 있기 때문에 재귀적으로 호출할 수 있다.
    // 재귀적 참조는 일반적이지 않고 바람직하지 않다.
  },
};

// this 사용
const circle = {
  radius: 6,
  getDiameter() {
    return 2 * this.radius; // this가 메서드를 호출한 객체를 가리킨다.
  },
};
```

생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 하지만 생성자 함수에 의한 객체 생성 방식은 언제나 `new` 연산자와 함께 생성자 함수를 호출해야 한다.

생성자 함수를 정의하는 시점에는 인스턴스가 생성되기 이전이기 때문에 아직 어떤 식별자를 가르키는지 알 수 없다. 이때 JS 엔진은 자신이 생성할 인스턴스를 가리키는 특별한 식별자 `this`를 제공한다.

```js
function Circle(radius) {
  this.radius = radius;

  getDiameter() {
    return 2 * this.radius; // this가 생성자 함수가 생성할 인스턴스를 가리킨다.
  }
}

const circle = new Circle(6);
```

`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이며 `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

- `this`는 JS 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. -> but 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메서드, 생성자 함수 내부에서만 의미가 있다.
- 함수를 호출하면 `arguments` 객체와 같이 암묵적으로 함수 내부에 전달된다.
- 함수 내부에서 `arguments` 객체처럼 지역 변수로 사용할 수 있다.
- `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다. -> 엄격 모드 또한 `this` 바인딩에 영향을 준다.
- 전역, 일반 함수 내부에서는 `window`를 가리킨다. -> 엄격 모드가 적용된 일반 함수의 경우 `undefined`가 바인딩 된다. (일반 함수 내부에서는 `this`를 사용할 필요가 없기 때문)

## 📝 22.2 함수 호출 방식과 this 바인딩

`this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다. **동일한 함수도 다양한 방식으로 호출할 수 있으니 주의하자.**

렉시컬 스코프와 `this` 바인딩은 결정 시기가 다르다. 렉시컬 스코프의 경우 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.

### ✏️ 일반 함수 호출

기본적으로 `this`에는 전역 객체가 바인딩된다.

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this); // {value: 100, foo: f}
    console.log(this.value); // 100

    function boo() {
      console.log(this); // window
      console.log(this.value); // 1
    }

    boo(); // 메서드 내부에 정의된 중첨 함수도 일반 함수로 호출하면 this에 전역 객체가 바인딩된다.
  },
};

obj.foo();
```

일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 `this`에는 전역 객체가 바인딩된다.

중첩 함수, 콜백 함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하므로 외부 함수의 일부 로직을 대신하는 경우가 대부분인데 `this`가 전역 객체를 바인딩해 외부 함수인 메서드와 `this`가 일치하지 않는 것은 헬퍼 함수로 동작하기 어렵게 만든다.

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this.value); // 100

    const that = this;

    function boo() {
      console.log(that.value); // 100
    }

    boo();
  },
};

obj.foo();

// bind
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this.value); // 100

    function boo() {
      console.log(this.value); // 100
    }

    const boundBoo = boo.bind(this);
    boundBoo();
  },
};

obj.foo();

// 화살표 함수
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this.value); // 100

    const boo = () => {
      console.log(this.value); // 100
    };

    boo();
  },
};

obj.foo();
```

메서드 내부의 중첨 함수, 콜백 함수의 `this` 바인딩을 메서드의 `this` 바인딩과 일치시키기 위한 방법으로는 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind`를 사용해 명시적으로 `this`를 바인딩 하거나 메서드 내부에서 `this`를 변수에 할당시켜 중첩 함수, 콜백 함수 내부에서 참조하는 방식, 화살표 함수를 사용하는 방식이 있다.

### ✏️ 메서드 호출

메서드 내부의 객체는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다. -> 프로토타입 메서드 내부에서 사용된 `this`도 마찬가지.

메서드는 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체이기 때문에 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```js
const person = {
  name: 'oh',
  getName() {
    return this.name;
  },
};

const person2 = {
  name: 'lee',
};

// 다른 객체에 메서드를 할당
person2.getName = person.getName;

console.log(person2.getName()); // lee

// 일반 변수에 메서드를 할당
const getName = person.getName;

console.log(getName()); // ''
// 브라우저 -> window.name = ''
// Node.js -> undefined
```

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('oh');

console.log(me.getName()); // oh

Person.prototype.name = 'lee';

console.log(Person.prototype.getName()); // lee
```

### ✏️ 생성자 함수 호출

생성자 함수 내부의 `this`에는 미래에 생성할 인스턴스가 바인딩된다.

```js
function Person(name) {
  this.name = name;

  this.sayHi = function () {
    return `Hi i am ${this.name}`;
  };
}

const lee = new Person('lee');
const oh = new Person('oh');

console.log(lee.sayHi()); // Hi i am lee
console.log(oh.sayHi()); // Hi i am oh

// 일반 함수로서 호출했을 경우
const kim = Person('kim');

console.log(kim); // undefined

// 일반 함수로 호출했을 경우 내부의 this는 전역 객체를 가리킨다.
console.log(name); // kim
```

### ✏️ Function.prototype.apply/call/bind 메서드에 의한 간접 호출

`apply`, `call`, `bind` 메서드는 `Function.prototype`의 메서드로 모든 함수가 상속받아 사용할 수 있다.

#### ✅ apply, call

`apply`, `call` 메서드의 본질적인 기능은 함수를 호출하는 것이다. 함수를 호출하면 인수로 전달한 객체를 호출한 함수의 `this`에 바인딩한다. 둘은 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다.

대표적으로 `arguments` 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우에 사용한다.

```js
function getThisBinding() {
  console.log(arguments);
  return this;
}

const thisArg = { a: 1 };

// apply는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) {1,2,3, callee: f, Symbol(Symbol.iterator): f}
// {a: 1}

// call은 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) {1,2,3, callee: f, Symbol(Symbol.iterator): f}
// {a: 1}
```

#### ✅ bind

`apply`, `call`와 달리 함수를 호출하지 않고 첫번째 인수로 전달한 값으로 `this` 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

메서드 내부에 중첩 함수, 콜백 함수의 `this`가 불일치하는 문제를 해결하기 위해 사용된다.

```js
function foo() {
  return this;
}

const thisArg = { a: 1 };

console.log(foo.bind(thisArg)); // 전달된 인수로 this 바인딩이 교체된 foo
console.log(foo.bind(thisArg)()); // { a: 1 }

const person = {
  name: 'lee',
  foo(callback) {
    // 콜백 함수에 함수 내부 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  },
};
```
