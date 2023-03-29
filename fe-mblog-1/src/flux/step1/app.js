/**
 * 상태는 createStore() 안에 있다.
 * state - 상태를 담아두는 저장소
 * data를 사용하는 것은 components 소문자면 함수, 대문자면 컴포넌트
 * 자바스크립트에서 함수는 객체이다.
 * return에서는 상태 값을 직접 넘겨주지 않는다.
 * 상태는 createStore함수에 있지만 변경하거나 읽거나 하는 코드들은 UI의 Component들이다.
 * 이 컴포넌트들은 createStore 함수의 바깥쪽에 위치한다.
 * createStore가 상태구조를 알 수 있을까? 개발자들이 알고 있을 것이다. App을 개발하는 개발자가 상태를 변경하는 Logic을 작성해야한다.
 *
 * 개발자들이 앱을 만들면서 적절한 타이밍에 시그널을 넘겨주는게 중요하다.
 * 개발자는 createStore가 시그널을 받을 수 있는 구조를 제공해야한다.
 *
 * 상태를 담을 변수 선언
 * 콜백함수를 담을 배열 선언
 * send함수 구현 - 파라미터 action
 * 구독발행모델-subscribe(handler-콜백함수)
 * subscribe를 통해서 들어온 콜백함수는 handlers배열에 담는다
 * getState함수를 통해서
 * @returns
 */
const createStore = () => {
  //위치는 index.js - store생성~~
  let state; // undifined
  //함수를 담아두는 배열
  let handlers = [];
  //상태를 바꾸는 일을 함 - useSelector훅
  const send = (action) => {
    console.log("send");
    // 새로운 객체가 만들어진다.
    state = worker(state, action);
    //전달받은 함수를 호출해줘 forEach문을 돌려 전달해준다.
    handlers.forEach((handler) => handler());
  };

  const subscribe = (handler) => {
    //useDispatch훅
    //콜백함수
    handlers.push(handler);
  };

  const getState = () => {
    return state;
  };

  // 함수 안에서 함수를 리턴하도록 처리를 해야 바깥쪽에서 해당 함수를 요청할 수 있다.
  return {
    send, // 함수 == 객체 파라미터로 들어온 상태를 받고 가공해서 새로운 객체로 내보낸다.
    getState, // 함수 - 상태 정보를 담은 state를 반환해준다.
    subscribe,
  };
};

/**
 * state가 undefined이 되는 것을 방지하기 위해 객체 선언
 * 상태를 바꾸면 createStore안에 state의 참조 무결성이 깨진다.
 * Redux에서는 상태를 함수는 반드시 새로운 상태를 반환
 * 새로운 상태라는 입력(Action)으로 상태의 객체를 줄테니 이 객체를 Deep Copy해서 기존의 참조를 끊어라 - 그래야 side effect 방지 가능
 * react-redux에서는 worker가 dispatcher가 된다.
 * @param {*} state
 * @returns
 */
//reducer,dispatch함수
const worker = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };

    case "decrease":
      return { ...state, count: state.count - 1 };

    default:
      return { ...state };
  }
};

/**
 * 자바스크립트에서는 함수도 파라미터로 넘길 수 있다.
 * index.js에서 생성할 것임
 */
const store = createStore(worker);

store.subscribe(() => {
  console.log(store.getState());
});

//action의 내용은 send에서 만듬
//사용자가 버튼을 클릭했을때 시그널이 발생함 - type정해서 value를 store에 전달함
store.send({ type: "increase" }); //시그널 주기 -action
store.send({ type: "increase" });
store.send({ type: "decrease" });

/*
FLUX Architecture 
1. UI한테는 직접적인 상태를 주지 않는다.

문제제기 
컴포넌트(HomePage.jsx, LoginPage.jsx)가 여러 개있는 상황에서 어떤 컴포넌트의 데이터가 변경 되었는지 알고 getState 함수를 호출할까?
구독발행 모델 (Publisher-Subscriber Pattern) 
내가 work함수를 줄테니 data가 변경이되면 그 함수를 호출해줘(이벤트 처리를 해줘)
*/
