# 📕 4장 변수

## 4.1 변수란 무엇인가? 왜 필요한가?

**변수(variable)**: 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 or 그 메모리 공간을 식별하기 위해 붙인 이름

- 변수는 프로그래밍 언어에서 데이터를 관리하기 위한 핵심 개념이다.
- 기억하고 싶은 값을 메모리에 저장하고, 저장된 값을 읽어 들여 재사용하기 위해 변수라는 메커니즘을 제공한다.
- 값을 참조하는 메커니즘, 값의 위치를 가리키는 상징적인 이름.
- 변수는 하나의 값을 저장하기 위한 메커니즘이다.
- 여러개의 값을 저장하려면 여러개의 변수를 사용해야 한다.
- 배열이나 객체를 사용하면 관련이 있는 여러 개의 값을 그룹화해서 하나의 값처럼 사용할 수 있다.

```js
const result = 10 + 20; // 값 30
```

_위 예시처럼 메모리 공간에 저장된 값을 식별할 수 있는 고유한 이름`result`를 변수 이름 변수에 저장된 값 `30`을 변수 값이라 한다._

- 변수에 값을 저장하는 것을 **할당**, 변수에 저장된 값을 읽어 들이는 것을 **참조** 라고 한다.

### 변수의 이름

변수의 이름은 변수에 저장된 값의 의미를 명확히 한다. 변수에 저장된 값의 의미를 파악할 수 있는 이름은 가독성을 높이는 효과도 존재한다.  
개발자의 의도를 나타내는 명확한 네이밍은 코드를 이해하기 쉽게 만들며, 협업과 품질 향상에 도움을 준다.

## 4.2 식별자

변수의 이름을 **식별자** 라고도 한다.  
**식별자(identifier)**: 어떤 값을 구별해서 식별할 수 있는 고유한 이름

- 식별자는 어떤 값이 저장되어 있는 메모리 주소를 기억한다.
- 값이 저장되어 있는 메모리 주소와 매핑 관계를 맺으며, 매핑 정보도 메모리에 저장되어야 한다.
- 메모리 주소에 붙인 이름 이라고 할 수 있다.

식별자라는 용어는 변수 이름에만 국한해서 사용하지 않는다.  
변수, 함수, 클래스 등의 이름은 모두 식별자다.  
메모리 상에 존재하는 어떤 값을 식별할 수 있는 이름은 모두 식별자라고 부른다.

## 4.3 변수 선언

변수 선언이란 값을 저장하기 위한 메모리 공간을 확보하고 변수 이름과 메모리 공간의 주소를 연결해서 값을 연결할 수 있게 준비하는 것.  
변수 선언에 의해 확보된 메모리 공간은 확보가 해재 되기 전까지 보호된다.  
변수를 사용하기 위해서는 선언이 필요하고 선언을 할 때 `var, let, const`라는 키워드를 사용한다.

- let, const 는 ES6 에서 도입됬다.

**var의 단점**

`var`는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 지원하기 때문에 의도치 않게 전역 변수가 선언될 수 있다.

```js
var score;
```

위와 같이 변수를 선언하면 확보된 공간에 암묵적으로 `undefined`가 할당되어 초기화 된다.

**js의 변수 선언 2단계**

- 선언 단계: 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
- 초기화 단계: 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 `undefined`를 할당해 초기화 한다.

만약에 초기화를 하지 않게 되면 이전에 사용했던 값이 남아있을 수 있다. 이러한 값을 **쓰레기 값**이라고 한다.

변수를 사용하려면 반드시 선언이 필요하다. 변수뿐만 아니라 모든 식별자가 해당된다.  
선언하지 않은 식별자에 접근하게 되면 `ReferenceError` 가 발생한다.

## 4.4 변수 선언의 실행 시점과 변수 호이스팅

```js
console.log(score); // undefined

var score; // 변수 선언문
```

위 예제의 경우 변수의 선언보다 변수의 참조가 먼저 이루어진다. 그렇다면 과연 `ReferenceError`가 발생하게 될까?  
정답은 아니다 그 이유는 자바스크립트는 소스코드를 한줄씩 읽으면서 실행된다. 하지만 소스코드는 그 시점이 아니라 소스코드가 실행되기 이전
소스코드의 평가 과정에서 변수의 선언이 먼저 이루어지기 때문에 해당 예제의 참조는 `ReferenceError`가 발생하지 않는다.

**변수 호이스팅**: 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징.

## 4.5 값의 할당

변수에 값을 할당할 때는 할당 연산자 (=)를 사용한다. 할당 연산자는 우변의 값을 좌변의 변수에 할당한다.

```js
var score; // 변수 선언
score = 80; // 값의 할당

var score = 80; // 변수 선언, 값의 할당 을 단축 표현
```

```js
console.log(score); // undefined

var score;
score = 80;

console.log(score); // 80
```

- 변수의 선언은 런타임 이전에 실행된다.
- 값의 할당은 런타임에 실행된다.

변수가 선언되면 초기화 단계에서 `undefined`가 할당된다. 이후 값이 할당되면 저장되어 있는 메모리 공간을 지우고 해당 메모리 공간에 값을 저장하는 것이 아니라 새로운 메모리 공간을 확보하고 그곳에 할당 값을 저장한다.

## 4.6 값의 재할당

값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 **상수(constant)** 라 한다.

```js
var score = 80; // 변수의 선언과 값의 할당
score = 90; // 값의 재할당
```

- `var` 키워드로 선언한 변수는 값의 재할당이 가능하다.
- 값을 재할당하게 되면 이전의 값이 저장되어 있는 메모리 공간이 아닌 새로운 공간을 확보하고 값을 저장한다.

### 가비지 콜렉터

위 예제를 보면 기존 변수의 값이 `undefined` => `80` => `90` 으로 변하게 되었다. 현재 값은 `90`이고  
이전 값인 `undefined`, `80` 은 더 이상 필요하지 않은 값이다. 이런 값은 가비지 콜렉터에 의해 메모리에서 자동으로 해제된다.  
하지만 해제 시점은 예측할 수 없다.

- 더이상 사용하지 않는 값이란 어떤 식별자도 참조하지 않는 메모리 공간.
- 자바스크립트는 매니지드 언어이기에 가비지 콜렉터를 이용해 **메모리 누수(memory leak)** 을 방지한다.

### 매니지드 언어 & 언매니지드 언어

**매니지드 언어**

- 메모리 할당 및 해제를 언어 차원에서 관리한다.
- 개발자 역량의 의존성이 줄어드나 성능 면에서 손실이 있다.

**언매니지드 언어**

- 메모리 할당 및 해제를 개발자가 직접 담당한다.
- 개발자의 역량에 의해 최적의 성능을 발휘할 수 있지만 반대로 치명적 오류를 생산할 수 있다.
