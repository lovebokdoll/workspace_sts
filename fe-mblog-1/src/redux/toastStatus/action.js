//action에서 사용되는 타입선언 -> 액션생성자 함수에서 사용된다..
export const SET_MSG = "TOAST_STATUS/SET_MSG";
export const SET_FALSE = "TOAST_STATUS/SET_FALSE";

//Action을 dispatch를 통해서 store에 전달할 때 호출되는 함수
//이것이 reducer에 전달되면 switch문에서 변화
/**
 * @param {*} msg 인자로 받아서 type,msg,bool속성을 가지는 객체를 반환
 * @returns
 * 이 객체는 Redux스토어에 전달될 때 dispacth함수를 호출하는 것으로 액션객체가 생상된다
 */
export const setToastMsg = (msg) => {
  return {
    type: SET_MSG, //type속성을 SET_MSG상수를 가리킨다.
    msg: msg, // 인자로 받은 msg속성을 가리킨다.
    bool: true, //bool속성은 true값을 가진다.
  };
};

export const setToastFalse = () => {
  return {
    type: SET_FALSE,
    msg: "",
    bool: false,
  };
};
