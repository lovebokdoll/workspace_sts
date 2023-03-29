import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/imageUploader";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "./redux/rootReducer";
import firebaseApp from "./service/firebase";
import { setAuth } from "./redux/userAuth/action";
import AuthLogic from "./service/authLogic";
//리덕스 적용하기
const store = legacy_createStore(rootReducer);
//AuthLogic객체 생성하기
const authLogic = new AuthLogic(firebaseApp);
//store에 있는 초기상태정보 출력하기
store.dispatch(
  setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
console.log(store.getState());
//이미지업로더 객체생성
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById("root"));
//리덕스 추가-store 생성
//createStore호출
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App authLogic={authLogic} imageUploader={imageUploader} />
      </BrowserRouter>
    </Provider>
  </>
);
