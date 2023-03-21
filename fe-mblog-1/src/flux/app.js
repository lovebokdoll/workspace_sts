//상태는 createStore함수 안에 있다.
const createStore = () => {
  let state; //상태를 담아두는 저장소
  //함수를 담아두는 배열 선언
  let handlers = [];
  //상태를 바꾸는 일을 한다.
  const send = (action) => {
    console.log("send호출");
    //새로운 객체가 만들어진다.
    state = worker(state.action);
    handler, forEach;
  };

  const subscribe = () => {
    handlers.push(handler);
  };

  const getState = () => {
    return state;
  };
  //외부에서 사용가능하게 하려면 반드시 함수안에서 함수를 리턴하도록 처리해야 한다.
  return {
    send, //함수==객체 파라미터로 들어온 상태를 받아서 가공해서 새로운 객체로 내보내는 일을 한다.
    getState, //함수-상태정보를 담은 state를 반환해주는 일을 하는 함수
  };
};

/**
 * 무엇을 해야하나요?
 * 상태를 바꾸면 createStore안에 state의 참조무결성이 깨지게 된다.
 * 리덕스에서는 상태를 바꾸는 함수는 반드시 새로운 상태를 반환해야 한다. => 그래야 참조무결성이 깨지지 않는다.
 * 새로운 상태라는 입력(Action)으로 상태의 객체를 줄테니 이 객체를 Deep copy해서 기존의 참조를 끊어라
 * 그래야 side effect방지 가능함
 */
//react-redux에서는 worker가 디스페쳐가 된다.
const worker = (state = { count: 0 }, action) => {
  //state가 undefined되는 것 방지위해 객체선언
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
};
//자바스크립트에서는 함수도 파라미터로 넘길 수 있다.
const store = createStore(worker);//index.js에 들어갈 코드
//subscribe함수 호출시 파라미터로 콜백함수를 넘김
store.subscribe(function() {
  console.log(store.getState());
});
store.send({ tyoe: "increase" });//시그널주기-action
store.send({ tyoe: "increase" });
store.send({ tyoe: "decrease" });

/**
 * 실제로 action을 store에 전달해주는 역할을 하니까!!
 * createStore에worker를 파라미터로 전달 해준다.
 * return에서는 상태값을 직접 넘겨주지 않는다.
 * 상태는 createStore함수에 있지만 변경하거나 읽거나하는 코드들은 UI에 컴포넌트들이다.
 * 이 Component들은 createStore()의 바깥쪽에 위치한다.
 *
 * 1.UI한테는 직접적인 상태를 주지 않는다.
 *
 * ===화면에 component가 여러개 있는 상황에서 (Homepage.jsx,LoginPage.jsx..)어떤 컴포넌트의 데이터가
 * 변경되었는지 어떻게 알고서 getState함수를 호출할수 있을까?===
 * 구독발행모델을 사용!-Pub and Subscribe
 * (worker함수를 넘겨줄테니까 데이터가 변경되면 그때 함수를 호출해달라고 한다.)
 */
