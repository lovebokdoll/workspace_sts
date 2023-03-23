import { decrease, increase } from "./actions.js";
import { reducer } from "./reducer.js"; //worker함수
import { createStore } from "./redux.js";
//사용- 함수 호출-store생성하기 => 리액트에서는 index.js에서 store를 생성할 것이당
//app.js에 있는 코드가 리액트 컴포넌트에 써야하는 코드이다.
//문제제기- app.js하나에 모두 있을때는 파라미터에 reducer(구:worker)파라미터로 넘겨야함
/**
 * 자바스크립트에서는 함수도 파라미터로 넘길 수 있다.
 * index.js에서 생성할 것임
 */
const store = createStore(reducer);
store.subscribe(() => {
  //구독발행모델
  //getState리액트에서 useSelector(state=>state.userAuth) =>상태값을 읽어올때사용
  console.log(store.getState()); //변경된 상태값찍기
});
//action의 내용은 send에서 만듬
//사용자가 버튼을 클릭했을때 시그널이 발생함 - type정해서 value를 store에 전달함
store.dispatch(increase()); //시그널 주기 -action -리액트 const dispatch = useDispatch()->dispatch(type,payload)
store.dispatch(increase());
store.dispatch(decrease());
