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
