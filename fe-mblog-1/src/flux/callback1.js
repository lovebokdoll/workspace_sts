function first(param) {
  console.log(param);
  param();
}

function second() {
  console.log(2);
}

first(second);
//순서대로 꼭 처리되어야 할때
function func1() {
  //outter함수
  let num = 0;
  return function func2() { //  return ()=> { 이렇게도 가능하다
    //반환형이 함수인 경우임
    return num++; //여기서 사용가능함
  };
}
let account = func1(); //account함수가 생성된 후에도 상위함수인 func1의 변수 num에 접근 가능하다
console.log(account());
console.log(account);
