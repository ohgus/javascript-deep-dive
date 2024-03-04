// var value = 1;

// const obj = {
//   value: 100,
//   foo() {
//     console.log(this); // {value: 100, foo: f}
//     console.log(this.value); // 100

//     function boo() {
//       console.log(this); // window
//       console.log(this.value); // 1
//     }

//     boo(); // 메서드 내부에 정의된 중첨 함수도 일반 함수로 호출하면 this에 전역 객체가 바인딩된다.
//   },
// };

// obj.foo();

// var value = 1;

// const obj = {
//   value: 100,
//   foo() {
//     console.log(this);
//     console.log(this.value);

//     const that = this;

//     function boo() {
//       console.log(that);
//       console.log(that.value);
//     }

//     boo();
//   },
// };

// obj.foo();

// var value = 1;

// const obj = {
//   value: 100,
//   foo() {
//     console.log(this.value);

//     function boo() {
//       console.log(this.value);
//     }

//     const boundBoo = boo.bind(this);
//     boundBoo();
//   },
// };

// obj.foo();

var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this.value);

    const boo = () => {
      console.log(this.value);
    };

    boo();
  },
};

obj.foo();
