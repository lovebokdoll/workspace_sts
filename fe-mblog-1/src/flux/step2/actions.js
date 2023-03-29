import {
  DECREASE,
  INCREASE,
  RESET,
  SET_FALSE,
  SET_MSG,
} from "./action-type.js";
import { actionCreator } from "./redux.js";

//store.dispatch(increase()); - dispacth는 action을 스토어에 전달하는 허브
//store에 들어있는 상태값을 꺼내는것이 getState이다. -> 리액트에서는 useSelector이다
export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const reset = actionCreator(RESET);
export const setToastMsg = (msg) => {
  return {
    type: SET_MSG,
    msg: msg,
    bool: true,
  };
};
export const setToastFalse = (msg) => {
  return {
    type: SET_FALSE,
    msg: msg,
    bool: true,
  };
};
