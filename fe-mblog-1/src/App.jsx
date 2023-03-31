import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import EmailVerifiedPage from "./component/auth/EmailVerifiedPage";
import FindEmailPage from "./component/auth/FindEmailPage";
import KhLoginPage from "./component/auth/KhLoginpage";
import ResetPwdPage from "./component/auth/ResetPwdPage";
import SignupPage from "./component/auth/SignupPage";
import DeptDetail from "./component/dept/DeptDetail";
import KakaoRedirectHandler from "./component/kakao/KakaoRedirectHandler";
import Profile from "./component/kakao/Profile";
import DeptPage from "./component/page/DeptPage";
import HomePage from "./component/page/HomePage";
import MemberPage from "./component/page/MemberPage";
import RepleBoardPage from "./component/page/RepleBoardPage";
import RepleBoardDetail from "./component/repleboard/RepleBoardDetail";
import RepleBoardWriteForm from "./component/repleboard/RepleBoardWriteForm";
import Toast from "./component/Toast";
import { onAuthChange } from "./service/authLogic";
import { memberListDB } from "./service/dbLogic";

function App({ authLogic, imageUploader }) {
  //화면을 전환시킬때 - window.location.href차이점 -새로고침 요청발생 - 가상돔 사용하지 않음
  const navigate = useNavigate(); //가상돔 사용됨
  //useDispatch hook사용하여 dispacth함수 가져오기.
  const dispatch = useDispatch(); //허브 - action.type(switch-선택),action.payload(내용)
  //state인자를 통해 Redux store의 state에 접근하고 state.toastStatus반환하여 해당 state를 가져온다
  const toastStatus = useSelector((state) => state.toastStatus);
  useEffect(() => {
    const asyncDB = async () => {
      console.log("asyncDB");
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
        const res = await memberListDB({ mem_uid: user.uid, type: "auth" });
        console.log(res.data);
        //오라클 서버의 회원집합에 uid가 존재하면 - 세션스토리지에 값을 담자
        if (res.data !== 0) {
          //스프링부트에서 RestMamberController - memberList에서 넘어오는 정보
          // 1)0이거나 2)[{mem_uid...}]
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
          ssg.setItem("nickname", jsonDoc[0].MEM_NICKNAME);
          ssg.setItem("status", jsonDoc[0].MEM_STATUS);
          ssg.setItem("auth", jsonDoc[0].MEM_AUTH);
          ssg.setItem("no", jsonDoc[0].MEM_NO);
          //navigate("/");
          return; //랜더링이 종료됨
        }
        //구글로그인을 했지만 false일 때
        if (!user.emailVerified) {
          navigate("./auth/emailVerified");
        }
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else {
          console.log(
            "해당 구글계정은 회원가입 대상입니다. 회원가입을 해주세요"
          );
          navigate("/auth/signup");
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
    asyncDB(); //함수호출
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
            path="/auth/emailVerified"
            exact={true}
            element={<EmailVerifiedPage authLogic={authLogic} />}
          />
          <Route //
            path="/auth/findemail"
            exact={true}
            element={<FindEmailPage />}
          />
          <Route //
            path="/auth/resetPwd"
            exact={true}
            element={<ResetPwdPage authLogic={authLogic} />}
          />
          <Route //
            path="/reple/board"
            exact={true}
            element={<RepleBoardPage />}
          />

          <Route //
            path="/reple/boarddetail/*"
            exact={true}
            element={<RepleBoardDetail />}
          />

          <Route //
            path="/reple/boardwrite"
            exact={true}
            element={<RepleBoardWriteForm />}
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
