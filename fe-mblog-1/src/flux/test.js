let global = -99; //전변

//아무런 변화도 없다. 선언하고 선언한것이 리턴됨
function func1() {
  let num = 0; //지변
  return num;
}
//파라미터로 넘어온 값과 나가는 값이 다르다는 것 - 변했다
function func2(num) {
  num = num + 1;
  return num;
}

//관전포인트는 num의 값이 바뀌지 않는다는 것 - 불변성 - 리액트컨벤션
function func3() {
  let num = 0; //지변 불변성
  global = num + 1;
  return global;
}

console.log(func1());
console.log(func2(2));
console.log(global);
console.log(func3());
console.log(global);
