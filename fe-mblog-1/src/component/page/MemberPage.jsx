import React, { useEffect, useState } from "react";
import { memberListDB } from "../../service/dbLogic";

const MemberPage = ({ imageUploader }) => {
  const [member, setMember] = useState({});
  useEffect(() => {
    const memberList = async () => {
      const res = await memberListDB(member);
      console.log(res.data);
    };
    memberList();
  }, []);
  const imgChange = async (event) => {
    console.log(event.target.files[0]);
    //async가 붙은 함수안에서만 await을 사용할 수 있음 - 파일을 업로드 할 때까지 기다림
    const uploaded = await imageUploader.upload(event.target.files[0]);
    //public_id - 선택한 이미지의 실제 아이디가 아닌 cloudinary에서 부여하는 아이디값
    // 이 값으로 실제 이미지 링크정보가 생성됨
    //format은 선택한 파일의 확장자임
    //url 링크 이미지 URL 정보
    console.log(`${uploaded.public_id}${uploaded.format}${uploaded.url}`);
  };
  return (
    <>
      <h3>회원관리 페이지입니다.</h3>
      <input type="file" name="mimg" id="mimg" onChange={imgChange} />
    </>
  );
};

export default MemberPage;
