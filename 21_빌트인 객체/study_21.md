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
