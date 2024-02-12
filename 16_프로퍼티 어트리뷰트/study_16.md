# 📕 16장 프로퍼티 어트리뷰트

## 📝 16.1 내부 슬롯과 내부 메서드

내부 슬롯(의사 프로퍼티)과 내부 메서드(의사 메서드)란 JS 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하며 이중 대괄호(`[[...]]`)로 감싼다.

- JS 엔진에서 실제로 동작하지만 직접적으로 접근할 수 있는 방법을 제공하지 않는다.
- 예외로 `[[Prototype]]`의 경우 `.__proto__`를 통해 간접적으로 접근할 수 있다.

```js
const o = {}

o.[[Prototype]]; // UncaughtError
o.__proto__; // Object.prototype
```

## 📝 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

JS 엔진은 프로퍼티를 생성할 때 프로퍼티 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

프로퍼티 어트리뷰트: 값(`value`), 값의 갱신 가능 여부(`writable`), 열거 가능 여부(`enumerable`), 재정의 가능 여부(`configurable`)

프로퍼티 어트리뷰트에 직접적으로 접근할 수 없지만 `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인할 수 있다.

```js
const person = {
  name: 'lee',
};

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: 'lee', writable: true, enumerable: true, cofigurable: true}
```

`Object.getOwnPropertyDescriptor` 메서드를 호출할 때는 첫 번째 매개변수에 객체의 참조를 전달, 두 번째 매개변수에 프로퍼티 키를 문자열로 전달하면 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터** 객체를 반환한다. 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 `undefined`를 반환한다.

`Object.getOwnPropertyDescriptors` 메서드를 사용하면 객체의 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

## 📝 16.3 데이터 프로퍼티와 접근자 프로퍼티

### ✏️ 16.3.1 데이터 프로퍼티

키와 값으로 구성된 일반적인 프로퍼티.

프로퍼티가 생성될 때 `[[Value]]`의 값은 프로퍼티 값으로 초기화되고 나머지 값들은 `true`로 초기화된다.(동적 추가도 마찬가지)

#### ✅ [[Value]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `value`
- 프로퍼티 키를 통해 값에 접근하면 반환되는 값.
- 프로퍼티 키를 통해 값을 변경하면 `[[Value]]`에 값을 재할당한다. (프로퍼티가 없는 경우 프로퍼티를 동적으로 생성하고 `[[Value]]`에 값을 저장한다)

#### ✅ [[Writable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `writable`
- 프로퍼티 값의 변경 가능 여부를 불리언 값으로 나타낸다.
- 값이 `false`인 경우 `[[Value]]`의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.

#### ✅ [[Enumerable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `enumerable`
- 프로퍼티의 열거 가능 여부를 불리언 값으로 나타낸다.
- 값이 `false`인 경우 `for...in` 문이나 `Object.keys` 메서드 등으로 열거할 수 없다.

#### ✅ [[Configurable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `configurable`
- 프로퍼티의 재정의 가능 여부를 불리언 값으로 나타낸다.
- 값이 `false`인 경우 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지되지만 `[[Writable]]`의 값이 `true`인 경우 `[[Value]]`의 변경과 `[[Writable]]`을 `false`로 변경하는 것은 가능하다.

### ✏️ 16.3.2 접근자 프로퍼티

자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티.

`getter`/`setter` 함수라고도 불리며 `getter`와 `setter` 모두 정의하거나 하나만 정의할 수 있다.

#### ✅ [[Get]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `get`
- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수.
- 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 `getter` 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.

```
💡 getter 함수 동작순서

1. 프로퍼티 키가 유효한지 확인한다. (문자열 or 심벌)
2. 프로토타입 체인에서 프로퍼티를 검색한다.
3. 검색한 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.
4. 접근자 프로퍼티의 프로퍼티 어트리뷰트 getter 함수를 호출하여 결과를 반환한다.
```

#### ✅ [[Set]]

- 프로퍼티 디스크립터 객체의 프로퍼티 -> `set`
- 접근자 프로퍼티를 통해 데이터 프로퍼티 값을 저장할 때 호출되는 접근자 함수.
- 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 `setter` 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다.

#### ✅ [[Enumerable]]

데이터 프로퍼티와 동일.

#### ✅ [[Configurable]]

데이터 프로퍼티와 동일.

```js
const person = {
  firstName: 'myoung-seok',
  lastName: 'oh',

  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
};

person.fullName = 'Min-seok Oh';
console.log(person.fullName); // Min-seok Oh

let descriptor = Object.getOwnPropertyDescriptor(person, 'fistName');
console.log(descriptor); // {value: Min-seok, writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor); // {get: f, set: f, enumerable: true, configurable: true}
```

#### 💡 프로토타입 & 프로토타입 체인

⚙️ **프로토타입**

어떤 객체의 상위 객체 역할을 하는 객체로 하위 객체에게 자신의 프로퍼티와 메서드를 상속한다. 상속받은 하위 객체는 프로토타입 객체의 프로퍼티와 메서드를 자유자재로 사용할 수 있다.

⚙️ **프로토타입 체인**

프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조로 객체의 프로퍼티나 메서드에 접근하려 할 때 해당 객체에 접근하려는 프로퍼티나 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례로 검색한다.

#### 💡 접근자 프로퍼티 & 데이터 프로퍼티 구별하기

```js
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: f, set: f, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function () {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```

## 📝 16.4 프로퍼티 정의

새로운 프로퍼티를 정의하면서 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 어트리뷰트를 재정의 하는 것을 프로퍼티 정의라고 한다.

프로퍼티 정의는 `Object.definedProperty` 메서드를 사용하며 누락된 프로퍼티의 값은 `undefined`, `false`가 기본값이다.

- `value`, `get`, `set` -> `undefined`
- `writable`, `enumerable`, `configurable` -> `false`
- 한번에 하나의 프로퍼티만 정의할 수 있지만 `Object.definedProperties` 메서드를 사용하면 여러개의 프로퍼티를 정의할 수 있다.
- `writable`의 값이 `false`인 경우 `value`의 값을 변경할 수 없는데 만약 값을 변경할 경우 에러는 발생하지 않고 무시된다.
- `enumerable`의 값이 `false`인 경우 `for...in` 문이나 `Object.keys` 등으로 열거할 수 없다.
- `configurable`의 값이 `false`인 경우 프로퍼티의 값을 삭제하거나 재정의할 수 없다. 삭제의 경우 에러가 발생하지 않고 무시되나 재정의를 하면 `TypeError`가 발생한다.

```js
const dog = {};

Object.definedProperty(dog, 'age', {
  value: 5,
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.definedProperty(dog, 'color', {
  value: 'ivory',
});

const descriptor = Object.getOwnPropertyDescriptor(dog, 'color');
console.log(descriptor);
// {value: 'ivory', writable: false, enumerable: false, configurable: false}

// 한번에 여러개의 프로퍼티 정의
Object.definedProperties(dog, {
  age: {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  color: {
    value: 'ivory',
  },
});
```

## 📝 16.5 객체 변경 방지

|      구분      |           메서드           | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| :------------: | :------------------------: | :-----------: | :-----------: | :--------------: | :--------------: | :------------------------: |
| 객체 확장 금지 | `Object.preventExtensions` |       X       |       O       |        O         |        O         |             O              |
|   객체 밀봉    |       `Object.seal`        |       X       |       X       |        O         |        O         |             X              |
|   객체 동결    |      `Object.freeze`       |       X       |       X       |        O         |        X         |             X              |

### ✏️ 16.5.1 객체 확장 금지 `Object.preventExtensions`

확장이 금지된 객체는 프로퍼티 추가가 금지된다. `Object.isExtensible` 메서드로 객체의 확장 가능 여부를 확인할 수 있다.

```js
const person = { name: 'oh' };

console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person);

console.log(Object.isExtensible(person)); // false

person.age = 28; // 무시. strict mode에서는 에러

delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.defineProperty(person, 'age', { value: 28 });
// TypeError
```

### ✏️ 16.5.2 객체 밀봉 `Object.seal`

밀봉된 객체는 읽기와 쓰기만 가능하다. `Object.isSealed` 메서드로 객체의 밀봉 여부를 확인할 수 있다.

- 밀봉된 객체의 `configurable`은 `false`다.
- 프로퍼티 추가, 삭제, 어트리뷰트 재정의는 금지되지만 프로퍼티 값의 갱신은 가능하다.
- 추가, 삭제의 경우 strict mode에서만 에러가 발생하고 어트리뷰트 재정의는 무조건 에러가 발생한다.

```js
const person = { name: 'oh' };

console.log(Object.isSealed(person)); // false

Object.seal(person);

console.log(Object.isSealed(person)); // true

person.name = 'lee';

console.log(person); // { name: 'lee' }
```

### ✏️ 16.5.3 객체 동결 `Object.freeze`

동결된 객체는 읽기만 가능하다. `Object.isFrozen` 메서드로 객체의 동결 여부를 확인할 수 있다.

- 동결된 객체의 `writable`, `configurable`은 `false`다.
- 프로퍼티 추가, 삭제, 값의 갱신, 어트리뷰트 재정의가 금지된다.
- 추가, 삭제, 값의 갱신은 strict mode에서만 에러가 발생하고 어트리뷰트 재정의는 무조건 에러가 발생한다.

```js
const person = { name: 'oh' };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true
```

### ✏️ 16.5.4 불변 객체

`Object.freeze` 메서드로는 중첩 객체까지 동결하지 못한다. 중첩 객체까지 동결하기 위해서는 모든 프로퍼티에 대해 재귀적으로 `Object.freeze`를 호출해야 한다.

```js
const person = {
  name: 'oh',
  address: { city: 'bundang' },
};

Object.freeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'seoul';

function deepFreeze(target) {
  // 동결되지 않은 객체만 동결한다.
  if (target && typeOf target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);

    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

deepFreeze(person);

console.log(Object.isFrozen(person)); // true
console.log(Object.isFrozen(person.address)); // true
```
