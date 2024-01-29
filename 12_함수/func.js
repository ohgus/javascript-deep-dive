function changeValue(primitive, obj) {
  primitive += 100; // 원시 값은 불변 값이기 때문에 재할당으로 값을 변경
  obj.name = "lee";
}

let num = 100;
const person = { name: "oh" };

changeValue(num, person);

console.log(num); // 100 -> 원시 값은 원본 값이 훼손되지 않는다.
console.log(person); // name: "lee" -> 객체는 원본 값이 훼손된다.
