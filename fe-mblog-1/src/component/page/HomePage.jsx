import React from "react";
import { useNavigate } from "react-router-dom";
import BlogHeader from "../include/BlogHeader";
import KakaoMap from "../kakao/KakaoMap";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";

const HomePage = () => {
  const member = window.localStorage.getItem("member");
  console.log(JSON.parse(member));
  const jsonDoc = JSON.parse(member);
  console.log(jsonDoc.mem_id + "," + jsonDoc.mem_pw);
  const navigete = useNavigate();
  const handleLogin = () => {
    console.log("로그인으로 이동");
    navigete("/login");
  };
  return (
    <>
      <ContainerDiv>
        <BlogHeader />
        <HeaderDiv>
          <h1 style={{ marginLeft: "10px" }}> 다희블로그</h1>
          <BButton onClick={handleLogin}> 로그인</BButton>
        </HeaderDiv>
        <FormDiv>
          <div>이벤트존</div>
          <hr style={{ height: "2px" }} />
          <div>추천수업존</div>
          <hr style={{ height: "2px" }} />
          <div>카카오맵존</div>
          <KakaoMap />
          <hr style={{ height: "2px" }} />
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default HomePage;
