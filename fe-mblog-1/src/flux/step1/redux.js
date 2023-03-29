export const actionCreator = (type) => (payload) => ({
  //커링함수
  type,
  payload,
});

export const createStore = (reducer) => {
  let state; // undifined
  //함수를 담아두는 배열
  let handlers = [];
  //상태를 바꾸는 일을 함 - useSelector훅
  const dispatch = (action) => {
    console.log("dispatch호출");
    state = reducer(state, action);
    handlers.forEach((handler) => handler()); //전달받은 함수를 호출해줘
  };
  const subscribe = (handler) => {
    //useDispatch 훅
    handlers.push(handler);
  };
  const getState = () => {
    return state;
  };
  return {
    dispatch, //함수==객체 파라미터로 들어온 상태를 받아서 가공해서 새로운 객체로 내보냄
    getState, //함수 - 상태정보를 담은 state반환해줌
    subscribe,
  };
}; //end of store
