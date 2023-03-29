import * as ActionType from "./action-type.js";
/**
 * Store에서 관리해야 하는 상태값의 종류가 점점 늘어난다
 * -> 객체 리터럴 ->열거형연산자 ->n개 ->초기화
 */
const initializeState = { count: 0 };
export const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case ActionType.INCREASE:
      return { ...state, count: state.count + 2 }; //이렇게 하면 새로운 객체가 만들어진다
    case ActionType.DECREASE:
      return { ...state, count: state.count - 1 };
    case ActionType.RESET:
      return { ...state, count: 0 };
    default:
      return { ...state };
  }
};
/**
 * reducer,dispatch함수
 *state가 undefined되는 것 방지위해 객체선언
 *무엇을 해야 하나요?
 *상태를 바꾸면 createStore안에 state의 참조 무결성이 깨짐
 *리덕스에서는 상태를 바꾸는 함수는 반드시 새로운 상태를 반환하라
 *새로운 상태라는 입력(Action)으로 상태의 객체를 줄테니 이 객체를 Deep copy해서
 *기존의 참조를 끊어라 - 그래야 side effect방지 가능함
 * @param {*} state
 * @param {*} action
 * @returns
 */
