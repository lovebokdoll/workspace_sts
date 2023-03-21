import React from "react";
import BlogHeader from "../include/BlogHeader";
import KakaoMap from "../kakao/KakaoMap";
import { ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";

const HomePage = () => {
  return (
    <>
    <ContainerDiv>
       <BlogHeader />
      <HeaderDiv>
      <h1 style={{marginLeft:"10px"}}> 다희블로그</h1>
      </HeaderDiv>
      <FormDiv>
        <div>이벤트존</div>
        <hr style={{height:"2px"}}/>
        <div>추천수업존</div>
        <hr style={{height:"2px"}}/>
        <div>카카오맵존</div>
        <KakaoMap />
        <hr style={{height:"2px"}}/>
      </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default HomePage;
