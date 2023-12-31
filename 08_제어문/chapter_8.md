# 📕 8장 제어문

**제어문 : 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.**

일반적인 코드는 위에서 아래로 순차적으로 실행되지만 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.  
하지만 코드의 흐름을 혼란스럽게 만들어 코드의 가독성을 해지는 단점이 있고 이는 코드의 오류를 발생시키는 원인이 된다.  
제어문을 바르게 이해하는 것은 코딩 스킬에 많은 영향을 준다. 특히 `for`문은 매우 중요하므로 확실히 이해해야 한다.

## 📝 8.1 블록문

**블록문 : 0개 이상의 문을 중괄호로 묶은 것.**

- 자바스크립트는 블록문을 하나의 실행 단위로 취급한다.
- 단독으로 사용할 수도 있지만 일반적으로 제어문이나 함수를 정의할 때 사용한다.

```js
{
  var foo = 10;
}

var x = 1;
if (x < 10) {
  x++;
}

function sum(a, b) {
  return a + b;
}
```

## 📝 8.2 조건문

**조건문 : 주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정한다.**

- 조건문은 불리언 값으로 평가될 수 있는 표현식이다.
- 자바스크립트는 `if...else` 문과 `switch` 문으로 두 가지 조건문을 제공한다.

### ✏️ if...else 문

`if...else` 문은 주어진 조건식의 평가 결과에(`true` or `false`) 따라 실행할 코드 블록을 결정한다.  
`if` 문의 조건이 `true` 라면 `if` 문의 블록이 실행되고 `false` 라면 `else` 문의 코드 블록이 실행된다.

- `if` 문의 조건식은 불리언 값으로 평가되어야 한다.
- 만약 불리언 값이 아닌 값으로 평가된다면 암묵적으로 불리언 값으로 강제 변환되어 실행할 코드 블록을 결정한다.
- 조건식을 추가하려면 `else if` 문을 사용한다.
- `else` 문과 `else if` 문은 옵션이다.
- `if` 문과 `else` 문은 두번 이상 사용할 수 없다.

```js
if (조건식1) {
  // 조건식1이 참이면 실행
} else if (조건식2) {
  // 조건식2가 참이면 실행
} else {
  // 조건식1과 조건식2가 모두 거짓이면 실행
}
```

만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

```js
if (조건식1) // 조건식1이 참이면 실행
else if (조건식2) // 조건식2가 참이면 실행
else // 조건식1,2가 모두 거짓이면 실행
```

대부분의 `if...else` 문은 삼항 조건 연산자로 대체할 수 있다.

```js
var x = 2;
var result;

// if...else
// 0은 false 로 취급한다
if (x % 2) {
  result = "홀수";
} else {
  result = "짝수";
}

// 삼항 조건 연산자
result = x % 2 ? "홀수" : "짝수";
```

삼항 조건 연산자는 값으로 평가되는 표현식을 만들기 때문에 변수에 할당할 수 있다.  
하지만 `if...else` 문은 표현식이 아닌 문이기 때문에 변수에 할달할 수 없다.  
조건에 따라서 단순히 값을 결정하여 변수에 할당할 경우 삼항 연산자가 가독성이 더 좋지만 여러 줄의 문이 필요하다면 `if...else` 문을 사용하는 편이 가독성이 더 좋다.

### ✏️ switch 문

`switch` 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 `case` 문으로 실행 흐름을 옮긴다.  
`case` 문은 상황을 의미하는 표현식을 지정하고 콜론으로 마친다. 그리고 그 뒤에 실행할 문들을 위치시킨다.

```js
switch (표현식) {
  case 표현식1:
    // 표현식과 표현식1이 일치하면 실행
    break;
  case 표현식2:
    // 표현식과 표현식2가 일치하면 실행
    break;
  default:
  // 표현식과 일치하는 case 가 없을 때 실행
}
```

- `default` 문은 일치하는 `case` 가 없다면 실행된다.
- `default` 문은 옵션이다.
- `switch` 문의 표현식은 불리언 값보다는 문자열, 숫자 값인 경우가 많다. (참, 거짓보다는 case에 따라서 실행)
- `case` 문에 `break` 가 없다면 일치하는 `case` 이후에 나오는 모든 문이 실행된다. (**fall through**)
- **fall through** 현상을 이용해 여러가지 케이스에 동일한 문을 실행할 수도 있다.

## 📝 8.3 반복문

**반복문 : 조건식의 평가 결과가 참인 경우 코드 블록을 실행하고 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행한다.**

자바스크립트는 세 가지 반복문인 `for` 문, `while` 문, `do...while` 문을 제공한다.

### ✏️ for 문

`for` 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.  
`for` 문의 변수 선언문, 조건식, 증감식은 모두 옵션이지만 하나는 반드시 선언되어야 한다. 그렇지 않으면 무한루프에 빠지게 된다.

```js
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행
}

for (var i = 0; i < 2; i++) {
  console.log(i);
}
// 0
// 1

for (var i = 1; i >= 0; i--) {
  console.log(i);
}
// 1
// 0

for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) {
      console.log(`[${i}, ${j}]`);
    }
  }
}
// 1, 5
// 2, 4
// 3, 3
// 4, 2
// 5, 1
```

### ✏️ while 문

`while` 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.  
`for` 문은 반복 횟수가 명확할 때 주로 사용되고 `while` 문은 반복 횟수가 불명확할 때 주로 사용된다.

- 평가 결과가 거짓이 되면 코드 블록을 종료한다.
- 조건식의 결과가 언제나 참이면 무한루프가 된다.
- 무한루프를 탈출하기 위해 `if` 문으로 조건을 만들어 `break` 문으로 코드 블록을 탈출한다.

```js
var cnt = 0;

while (true) {
  console.log(cnt);
  cnt++;

  if (cnt === 3) {
    break;
  }
}
// 0 1 2
```

### ✏️ do...while 문

`do...while` 문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.

```js
var cnt = 0;

do {
  console.log(cnt);
  cnt++;
} while (cnt < 3);
```

## 📝 8.4 break 문

`break` 문은 레이블 문, 반복문, `switch` 문의 코드 블록을 탈출한다.  
이외의 문에 `break` 문을 사용하면 `SyntaxError` 가 발생한다.

#### 💡 레이블 문?

- 식별자가 붙은 문을 레이블 문 이라고 한다.
- `switch` 문의 `case` 문과 `default` 문도 레이블 문이다.
- 레이블 문은 프로그램의 실행 순서를 제어하는데 사용한다.
- 레이블 문을 탈출하려면 break 문에 식별자를 지정한다.

중첩된 for 문의 내부 for 문에서 break 문을 실행하면 외부 for 문으로 탈출한다. 이때 외부 for 문을 탈출하기 위해 레이블 문을 사용한다.  
레이블 문을 사용하면 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높아지기 때문에 이외의 경우에는 사용을 권장하지 않는다.

```js
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (i + j === 3) {
      break outer;
    }
    console.log(i, j);
  }
}
```

## 📝 8.5 continue 문

`continue` 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. (`break` 문 처럼 탈출하지 않는다)

만약 `if` 문의 실행 코드가 한 줄이라면 `continue` 문을 사용하는 것보다 간편하고 가독성이 좋지만 실행해야 하는 코드가 많다면 들여쓰기가 한 단계 깊어지므로 `continue` 문을 사용하는 것이 가독성이 좋다.

```js
var string = "hello";
var search = "l";
var cnt = 0;

for (var i = 0; i < string.length; i++) {
  if (string[i] === search) {
    cnt++;
    // code
    // code
    // code
  }
}

for (var i = 0; i < string.length; i++) {
  if (string[i] !== search) continue;

  cnt++;
  // code
  // code
  // code
}
```
