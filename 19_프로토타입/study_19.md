# 📕 19장 프로토타입

**JS는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어다.**

```
💡 클래스

ES6에서 도입된 클래스는 함수다.
기존 프로토타입 기반 객체지향 모델을 폐지하고 새로운 모델을 제공하는 것은 아니고 새로운 객체 생성 메커니즘으로 보는 것이 합당하다.
클래스와 생성자 함수는 프로토타입 기반의 인스턴스를 생성하지만 동일하게 동작하지는 않는다.
클래스는 생성자 함수보다 엄격하며 생성자 함수에서 제공하지 않는 기능도 제공한다.
```

## 📝 19.1 객체지향 프로그래밍

객체지향 프로그래밍은 여러 개의 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말하며, 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다. 이때 실체는 특징이나 성질을 나타내는 속성을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

- 속성의 예시로 사람은 이름, 주소, 나이, 몸무게 등으로 구분할 수 있는데 이러한 속성 중에 프로그램에 필요한 것만 간추려 표현하는 것을 **추상화**라 한다.
- 객체란 ?
  - 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 한다.
  - 프로퍼티와 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조
- 객체지향 프로그래밍은 객체의 프로퍼티와 메서드를 하나의 논리적인 단위로 묶어 생각한다.
- 객체는 하나의 독립적인 부품으로 볼 수 있지만 다른 객체와 관계성을 가질 수 있으며, 다른 객체와 메시지를 주고 받고 데이터를 처리할 수 있고, 다른 객체의 프로퍼티나 메서드를 상속받아 사용하기도 한다.

```js
const person = {
  name: 'oh',
  age: 28,
  address: 'bundang',
  introduce() {
    console.log(
      `Hi my name is ${this.name} and i am ${this.age} old, and i live in ${this.address}`
    );
  },
};
```

## 📝 19.2 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다. JS는 상속을 프로토타입을 기반으로 상속을 구현하여 기존의 코드를 재사용할 수 있어 붎필요한 중복을 줄여 개발 비용을 줄일 수 있다.

생성자 함수를 통해서 동일한 메서드를 갖는 다른 객체를 만들 때 코드를 별개로 작성하는 수고를 줄일 수 있었다. 하지만 인스턴스가 생성될 때마다 동일한 메서드가 중복으로 생성되어 불필요한 메모리를 낭비하는 문제가 있다. 이를 상속을 통해 해결할 수 있다.

```js
function Person(name) {
  this.name = name;
  this.sayHi() {
    console.log(`Hi my name is ${this.name}`);
  }
}

const person1 = new Person('oh');
const person2 = new Person('kim');

// 상속을 활용
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log(`Hi my name is ${this.name}`);
}

// 각각의 인스턴스가 별개의 프로퍼티를 갖지만 동일한 메서드를 부모의 프로토타입으로부터 상속받는다.
// 각각의 인스턴스가 별개의 메서드를 중복으로 생성하지 않고 하나의 메서드를 공유한다.
const person1 = new Person('oh');
const person2 = new Person('kim');
```

## 📝 19.3 프로토타입 객체

프로토타입 객체는 객체자향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 프로토타입은 부모 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다. 상속받은 자식 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 사용할 수 있다.

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며 내부 슬롯의 값은 프로토타입의 참조다. `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

모든 객체는 하나의 프로토타입을 가지며 모든 프로토타입은 생성자 함수와 연결되어 있다.

프로토타입 내부 슬롯에 직접 접근할 수 없지만 `__proto__` 접근자 프로퍼티를 통해 간접적으로 접근할 수 있다. 그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.
