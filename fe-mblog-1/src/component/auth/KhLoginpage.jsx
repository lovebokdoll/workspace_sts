import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginEmail, loginGoogle } from "../../service/authLogic";
import {
  DividerDiv,
  DividerHr,
  DividerSpan,
  GoogleButton,
  LoginForm,
  MyH1,
  MyInput,
  MyLabel,
  MyP,
  PwEye,
  SubmitButton,
} from "../style/FormStyle";

const KhLoginPage = ({ authLogic }) => {
  const navigate = useNavigate();
  console.log("LoginPage");
  const auth = authLogic.getUserAuth();
  const [submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: "rgb(175, 210, 244)",
    hover: false,
  });

  const [tempUser, setTempUser] = useState({
    email: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  useEffect(() => {
    if (tempUser.email !== "" && tempUser.password !== "") {
      setSubmitBtn({ disabled: false, bgColor: "rgb(105, 175, 245)" });
    } else {
      setSubmitBtn({ disabled: true, bgColor: "rgb(175, 210, 244)" });
    }
  }, [tempUser]);

  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({ ...tempUser, [id]: value });
  };

  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if (id === "password") {
      if (!passwordType.visible) {
        setPasswordType({ ...passwordType, type: "text", visible: true });
      } else {
        setPasswordType({ ...passwordType, type: "password", visible: false });
      }
    }
  };

  const toggleHover = () => {
    if (submitBtn.hover) {
      setSubmitBtn({
        ...submitBtn,
        hover: false,
        bgColor: "rgb(105, 175, 245)",
      });
    } else {
      setSubmitBtn({ ...submitBtn, hover: true, bgColor: "rgb(58, 129, 200)" });
    }
  };

  const loginE = async () => {
    // 이메일 로그인 구현
    try {
      const result = await loginEmail(auth, tempUser);
      console.log(result);
      console.log(result.user.uid);
      //세션에 값을 담을때
      //윈도우나 브라우저 탭을 닫을 경우 제거된다. 지속적으로 필요한 데이터는 로컬스토리지에 저장하고,
      //잠깐동안 필요한 정보는 세션스토리지에 저장한다. - jsession 아이디의 값이 바뀐다.
      window.sessionStorage.setItem("userId", result.user.uid);
      window.localStorage.setItem("userId", result.user.uid);
      //문자열을 넘어서 객체정보도 저장할 수 있다.
      window.localStorage.setItem(
        "member",
        JSON.stringify({ mem_id: "test", mem_pw: "123" })
      );

      navigate("/"); //Routh path="/"
    } catch (error) {
      console.log(error + ":로그인에러입니다.");
    }
  };

  const loginG = async () => {
    // 구글 로그인 구현
    try {
      const result = await loginGoogle(
        authLogic.getUserAuth(),
        authLogic.getGoogleAuthProvider()
      );
      console.log(result.data);
      // navigate("/");
      // window.location.reload();
    } catch (error) {
      console.log(error + "로그인오류입니다");
    }
  };
  return (
    <>
      <LoginForm>
        <MyH1>로그인</MyH1>
        <MyLabel htmlFor="email">
          {" "}
          이메일
          <MyInput
            type="email_"
            id="email"
            name="mem_email"
            placeholder="이메일를 입력해주세요."
            onChange={(e) => changeUser(e)}
          />
        </MyLabel>
        <MyLabel htmlFor="password">
          {" "}
          비밀번호
          <MyInput
            type={passwordType.type}
            autoComplete="off"
            id="password"
            name="mem_password"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => changeUser(e)}
          />
          <div
            id="password"
            onClick={(e) => {
              passwordView(e);
            }}
            style={{ color: `${passwordType.visible ? "gray" : "lightgray"}` }}
          >
            <PwEye className="fa fa-eye fa-lg"></PwEye>
          </div>
        </MyLabel>
        <SubmitButton
          type="button"
          disabled={submitBtn.disabled}
          style={{ backgroundColor: submitBtn.bgColor }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          onClick={() => {
            loginE();
          }}
        >
          로그인
        </SubmitButton>
        <DividerDiv>
          <DividerHr />
          <DividerSpan>또는</DividerSpan>
        </DividerDiv>
        <GoogleButton
          type="button"
          onClick={() => {
            loginG();
          }}
        >
          <i
            className="fab fa-google-plus-g"
            style={{ color: "red", fontSize: "18px" }}
          ></i>
          &nbsp;&nbsp;Google 로그인
        </GoogleButton>
        <MyP style={{ marginTop: "30px" }}>
          신규 사용자이신가요?&nbsp;
          <Link
            to="/login/signup"
            className="text-decoration-none"
            style={{ color: "blue" }}
          >
            계정 만들기
          </Link>
        </MyP>
        <MyP>
          이메일를 잊으셨나요?&nbsp;
          <Link
            to="/login/findEmail"
            className="text-decoration-none"
            style={{ color: "blue" }}
          >
            이메일 찾기
          </Link>
        </MyP>
        <MyP>
          비밀번호를 잊으셨나요?&nbsp;
          <Link
            to="/login/resetPwd"
            className="text-decoration-none"
            style={{ color: "blue" }}
          >
            비밀번호 변경
          </Link>
        </MyP>
      </LoginForm>
    </>
  );
};

export default KhLoginPage;
