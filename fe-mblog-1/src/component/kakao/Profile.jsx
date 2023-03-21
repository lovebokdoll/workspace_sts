import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  console.log("Profile");
  //카카오에 부여해준 아이디값
  const [user_id, setUserId] = useState();
  //카카오에 등록된 사용자명
  const [nickName, setNickName] = useState();
  //카카오에 등록된 프로필이미지
  const [profileImage, setProfileImage] = useState();
  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log("data.id : " + data.id);
      console.log("data.nickname : " + data.properties.nickname);
      console.log("data.profile_image: " + data.properties.profile_image);
      // 사용자 정보 변수에 저장하기
      setUserId(data.id);
      window.localStorage.setItem("userID", user_id);
      setNickName(data.properties.nickname);
      window.localStorage.setItem("nickName", nickName);
      setProfileImage(data.properties.profile_image);
      navigate("/");
    } catch (error) {
      console.log("error:" + error);
    }
  };
  useEffect(() => {
    getProfile();
  });
  const kakaoLogout = async () => {
    //로그아웃처리
    await axios({
      method: "GET",
      url: `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000`,
    })
      .then((res) => {
        console.log(res);
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("nickName");
        navigate("/");
      })
      .catch((error) => {
        //콜백에서 에러 발생시 실행
        console.log("error:" + error);
      });
  };
  return (
    <>
      <h3>{user_id}</h3>
      <h3>{nickName}</h3>
      <img src={profileImage} alt="프로필이미지"></img>
      <br />
      <button onClick={kakaoLogout}>카카오로그아웃</button>
    </>
  );
};

export default Profile;
