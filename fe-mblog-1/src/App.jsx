import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import KhLoginPage from "./component/auth/KhLoginpage";
import LoginPage from "./component/auth/LoginPage";
import SignupPage from "./component/auth/SignupPage";
import DeptDetail from "./component/dept/DeptDetail";
import KakaoRedirectHandler from "./component/kakao/KakaoRedirectHandler";
import Profile from "./component/kakao/Profile";
import DeptPage from "./component/page/DeptPage";
import HomePage from "./component/page/HomePage";
import MemberPage from "./component/page/MemberPage";
import RepleBoardPage from "./component/page/RepleBoardPage";
import Toast from "./component/Toast";
import { setToastMsg } from "./redux/toastStatus/action";
import { onAuthChange } from "./service/authLogic";
import { memberListDB } from "./service/dbLogic";

function App({ authLogic, imageUploader }) {
  const navigate = useNavigate();
  //useDispatch hook사용하여 dispacth함수 가져오기.
  const dispatch = useDispatch();
  //state인자를 통해 Redux store의 state에 접근하고 state.toastStatus반환하여 해당 state를 가져온다
  const toastStatus = useSelector((state) => state.toastStatus);
  useEffect(() => {
    const asyncDB = async () => {
      const auth = authLogic.getUserAuth();
      const ssg = sessionStorage;
      //현재 인증된 사용자정보를 가져온다.
      const user = await onAuthChange(auth);
      //사용자가 있으면 -userId가 있다.
      //구글로그인으로 사용자정보를 가지고 있을 때
      //user정보가 있으면 sessionStorage에 담는다. -email
      if (user) {
        console.log("user정보가 있을 때");
        ssg.setItem("email", user.email); //담기
        const res = await memberListDB({ MEM_ID: user.uid, type: "auth" });
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if (res.data) {
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          ssg.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          ssg.setItem("status", jsonDoc[0].MEM_STATUS);
          ssg.setItem("auth", jsonDoc[0].MEM_AUTH);
          ssg.setItem("no", jsonDoc[0].MEM_NO);
          navigate("/");
          return; //랜더링이 종료됨
        }
        //구글로그인을 했지만 false일 때
        // if(){

        // }
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else {
        }
      }
      //사용자 정보가 없을 때
      else {
        console.log("user정보가 없을 때");
        if (ssg.getItem("email")) {
          ssg.clear(); //세션스토리지에 있는 값 모두 삭제하기
          window.location.reload(); // 세션이 끊기니까 한번 새로고침
        }
      } //end of else
    };
  }, [dispatch]);
  return (
    <>
      <div style={{ height: "100vh" }}>
        {toastStatus.status && <Toast />}
        <Routes>
          <Route //
            path="/login"
            exact={true}
            element={<KhLoginPage authLogic={authLogic} />}
          />
          <Route //
            path="/"
            exact={true}
            element={<HomePage />}
          />
          <Route //
            path="/auth/signup"
            exact={true}
            element={<SignupPage authLogic={authLogic} />}
          />
          <Route //
            path="/repleboard"
            exact={true}
            element={<RepleBoardPage />}
          />
          <Route //
            path="/dept/:gubun"
            element={<DeptPage imageUploader={imageUploader} />}
          />
          {/*컴포넌트 함수를 호출하는 것이다 - 마운트 ->리턴이 호출되었다 */}
          <Route //
            path="/deptdetail/:deptno"
            element={<DeptDetail imageUploader={imageUploader} />}
          />
          <Route //
            path="/member"
            exact={true}
            element={<MemberPage imageUploader={imageUploader} />}
          />

          <Route //
            path="/profile"
            exact={true}
            element={<Profile />}
          />
          <Route //
            path="/auth/kakao/callback"
            exact={true}
            element={<KakaoRedirectHandler />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
