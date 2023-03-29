import { SET_FALSE, SET_MSG } from "./action";
import { toastStatus } from "./state";

//아래 toastInfo함수이름을 직접사용하지 않는다.
/**
 * 이 코드는 reducer함수이다.
 * @param {*} state  - 첫번째 파라미터로 state를 받는다. 이전 상태값을 가지고 있으며 기본값으로 toastStatus객체를 가진다
 * @param {*} action
 * -두번째 파라미터로 액션객체를 받는다. 반드시 type속성을 가지고 있어야 한다.
 * SET_MSG,SET_FALSE 두가지 타입의 액션을 처리할 수 있다.
 * @returns
 */
export default function toastInfo(state = toastStatus, action) {
  switch (action.type) {
    //여기서 상태를 변경하는 코드를 직접 작성해준다.
    /**
     * SET_MSG 타입의 액션이 들어오면 이전 상태값을 ...사용하여 state복사 한번 해주고
     * status와 msg 속성을 액션객체에서 받아온 값으로 덮어쓴다.
     * SET_FALSE의 경우도 마찬가지이다.
     * 만약 타입이 둘다 아닌 경우 이전 상태값을 그대로 반환한다. ==>default
     */
    case SET_MSG:
      return {
        ...state,
        status: action.bool,
        msg: action.msg,
      };
    case SET_FALSE:
      return {
        ...state,
        status: action.bool,
        msg: action.msg,
      };
    default:
      return { ...state };
  }
} //end of toastInfo
