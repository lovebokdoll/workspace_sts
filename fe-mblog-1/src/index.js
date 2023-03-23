import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/imageUploader";
import "bootstrap/dist/css/bootstrap.min.css";
//이미지업로더 객체생성
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById("root"));
//리덕스 추가-store 생성
//createStore호출
root.render(
  <>
    <BrowserRouter>
      <App imageUploader={imageUploader} />
    </BrowserRouter>
  </>
);
