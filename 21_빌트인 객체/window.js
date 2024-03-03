// const e = eval('1 + 2; 3 + 4;');
// console.log(e);

// const x = 1;

// function foo() {
//   'use strict';
//   eval('var x = 2; console.log(x, "hi")');
//   console.log(x); // 2
// }

// foo();
// console.log(x); // 1

// const uri = 'http://example.com?name=오명석&job=programer&teacher';
// const encode = encodeURI(uri);
// const decode = decodeURI(encode);
// console.log(encode); // http://example.com?name=%EC%98%A4%EB%AA%85%EC%84%9D&job=programer&teacher
// console.log(decode); // http://example.com?name=오명석&job=programer&teacher

const uriComp = 'name=오명석&job=programer&teacher';
const encode = encodeURIComponent(uriComp); // name%3D%EC%98%A4%EB%AA%85%EC%84%9D%26job%3Dprogramer%26teacher
const decode = decodeURIComponent(encode); // name=오명석&job=programer&teacher
console.log(encode);
console.log(decode);
