/**
 * Flux Architecture - One way binding
 */
/**
 * 콜백함수
 * document.querySelector("#root").addEventListener('click',function(){})
 */
/**
 * 함수선언
 * 일급객체시민 - 함수를 파라미터로 넘김, 리턴으로 넘김,할당가능
 */
const createStore = () => {
  console.log(worker);
  //외부클래스에서 선언한 변수를 내부함수에서 사용가능
  let state; //state.js - 상태관리가 필요한 변수들의 꾸러미
  //외부에서 구독신청을 한 회원들에게 알림처리 - 구독발행모델 패턴을 적용한다.
  let handlers = [];
  const subscribe = (handler) => {
    handlers.push(handler);
  };
  //위에서 선언된 상태정보를 담은 변수를 새로운 상태정보로 치환
  const send = (action) => {
    //worker함수의 파라미터로 state를 두는건 기존의 상태정보에 추가된 상태정보나 변견사항을 담기위해 넘겨주는것!
    state = worker(state, action);
    handlers.forEach((handler) => handler());
  };
  //내부함수 - 클로저 https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
  const getState = () => {
    //react=redux에서 제공함 -> 모방
    return state; // 관리하고 있는 상태값 모두를 말함 -> {}리터럴을 사용해야함 -> 그래야 여러개를 묶음으로 담아낼 수 있음
  };
  //리턴타입에 함수이름을 반환하는것은 외부에서 호출하기 위해서이다 -API
  return {
    //객체리터럴을 통해 사용하면 여러개의 함수를 외부에서 사용할 수 있다.
    getState,
    send,
    subscribe,
  };
}; //end of createStore

/**
 * 구독발행모델
 */

/**
 * 상태를 바꾼다
 * redux에서는 반드시 이 worker(상태를 바꾸는 함수)는 반드시 새로운 상태를 반환하라는 규칙을 만들었다 -> 깊은복사
 */
const worker = (state = { count: 0 }, action) => {
  //state가 undefined이 되면 안되니까 객체리터럴로 대입해줌!
  //do something..
  //여기서 상태를 바꾸면 createStore에 있는 state의 참조무결성이 깨진다.
  //기존의 참조를 끊어야 예상하지 못한 side effect를 원천적으로 차단할 수 있기 때문이다.
  switch (action.type) {
    case "increase":
      return { ...state, count: state + 1 };
    case "decrease":
      return { ...state, count: state - 1 };
    default:
      return { ...state }; //원본이 지켜진다.
  }
};

/**
 * 스토어 함수 호출
 */
//const store = legacy_createStore(reducer) -> reducer.js
//상태는 createStore함수 안에 있다. -6번 라인에 있다.!!
//누가 이 상태를 변경하고 읽어가나? -  component
//worker함수의 switch문에서 action.type에 따라서 상태를 변경하거나 읽어낸다.
//변경되고 읽어낸 정보는 return으로 처리했다.
//store를 모아서 상태의 묶음을 넘겨준다!
const store = createStore(worker);
store.subscribe(() => {
  console.log(store.getState());
});
//아래와 같이 store의 내부함수를 외부에서 호출하려면 반드시 return에 등록할 것
//action의내용을 만드는 역할을 send하는 쪽에서 만들어준다.
store.send({ type: "increase" });
store.send({ type: "increase" }); //1씩 증가
store.send({ type: "increase" }); //또 증가
// console.log(store.getState());
// store.send();
// console.log(store.getState());
/**
 * UI에게는 직접적인 상태를 주지 않는다
 * 그래서 여기에 return하는 것에는 state를 주지 않겠다 - 리덕스컨셉
 * state를 그냥 주는것은 자바스크립트 컨셉임
 *
 * 문제제기
 * 맥락없이 1을 증가하는 컨셉
 */
