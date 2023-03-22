import { Route, Routes } from "react-router-dom";
import LoginPage from "./component/auth/LoginPage";
import KakaoRedirectHandler from "./component/kakao/KakaoRedirectHandler";
import Profile from "./component/kakao/Profile";
import DeptPage from "./component/page/DeptPage";
import HomePage from "./component/page/HomePage";
import MemberPage from "./component/page/MemberPage";

function App({ imageUploader }) {
  return (
    <>
      <Routes>
        <Route //
          path="/"
          exact={true}
          element={<LoginPage />}
        />
        <Route //
          path="/home"
          exact={true}
          element={<HomePage />}
        />
        <Route //
          path="/dept/:gubun"
          element={<DeptPage imageUploader={imageUploader} />}
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
    </>
  );
}

export default App;
