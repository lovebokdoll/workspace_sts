import { combineReducers } from "redux";
import userAuth from "./userAuth/reducer";
import toastStatus from "./userAuth/reducer";
//여러개의 reducer함수를 합칩
//각 reducer함수들이 관리하는 상태를 조합하여 전체 애플리케이션의 상태를 관리한다.
export const rootReducer = combineReducers({
  userAuth,
  toastStatus,
});
export default rootReducer;
