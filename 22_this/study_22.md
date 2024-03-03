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