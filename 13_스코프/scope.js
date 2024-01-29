let x = "global";

function foo() {
  let x = "local";
  console.log(x);
}

foo();

console.log(x);
