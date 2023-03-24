import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberInsertDB } from "../../service/dbLogic";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";

//회원가입페이지
const Signup = () => {
  const navigate = useNavigate("");
  const [mem_uid, setMemuid] = useState("");
  const [mem_pw, setMempw] = useState("");
  const [mem_name, setMemname] = useState("");
  const [mem_nickname, setMemnickname] = useState("");
  const [mem_email, setMememail] = useState("");
  const [mem_tel, setMemtel] = useState("");
  const [mem_gender, setMemgender] = useState("");
  const [mem_birthday, setMembirthday] = useState("");
  //post,@RequestBody ,{} ->비동기처리 ->Promise(resolve,reject)
  const memberInsert = async () => {
    const member = {
      mem_uid,
      mem_pw,
      mem_name,
      mem_nickname,
      mem_email,
      mem_tel,
      mem_gender,
      mem_birthday,
    };
    const res = await memberInsertDB(member);
    if (!res.data) {
      console.log("회원가입에 실패하였습니다.");
    } else {
      console.log("회원가입에 성공하였습니다.");
      navigate("/home");
    }
  };
  const handleId = useCallback((e) => {
    setMemuid(e);
  }, []);
  const handlePw = useCallback((e) => {
    setMempw(e);
  }, []);
  const handleName = useCallback((e) => {
    setMemname(e);
  }, []);
  const handleNickname = useCallback((e) => {
    setMemnickname(e);
  }, []);
  const handleEmail = useCallback((e) => {
    setMememail(e);
  }, []);
  const handleTel = useCallback((e) => {
    setMemtel(e);
  }, []);
  const handleGender = useCallback((e) => {
    setMemgender(e);
  }, []);
  const handleBirthday = useCallback((e) => {
    setMembirthday(e);
  }, []);

  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{ marginLeft: "10px" }}>👩🏻회원가입</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{ width: "200px", maxWidth: "2000px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>아이디</h4>
            </div>
            <input
              id="mem_uid"
              type="text"
              maxLength="50"
              placeholder="아이디를 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleId(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>비밀번호</h4>
            </div>
            <input
              id="mem_pw"
              type="text"
              maxLength="50"
              placeholder="비밀번호를 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handlePw(e.target.value);
              }}
            />
            <br />
            <input
              id="mem_pw2"
              type="text"
              maxLength="50"
              placeholder="비밀번호를 확인하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>이름</h4>
            </div>
            <input
              id="mam_name"
              type="text"
              maxLength="50"
              placeholder="이름을 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleName(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>닉네임</h4>
            </div>
            <input
              id="mem_nickname"
              type="text"
              maxLength="50"
              placeholder="닉네임을 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleNickname(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>💌이메일</h4>
            </div>
            <input
              id="mem_email"
              type="text"
              maxLength="50"
              placeholder="이메일을 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleEmail(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>전화번호</h4>
            </div>
            <input
              id="mem_tel"
              type="text"
              maxLength="50"
              placeholder="전화번호를 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleTel(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>성별</h4>
            </div>
            <input
              id="mem_gender"
              type="text"
              maxLength="50"
              placeholder="성별을 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleGender(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>생년월일</h4>
            </div>
            <input
              id="mem_birthday"
              type="text"
              maxLength="50"
              placeholder="생년월일을 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleBirthday(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>우편번호</h4>
            </div>
            <input
              id="mem_zipcode"
              type="text"
              maxLength="50"
              placeholder="우편번호를 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h4>주소</h4>
            </div>
            <input
              id="mem_addr"
              type="text"
              maxLength="50"
              placeholder="주소를 입력하세요."
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
            />
          </div>
          <BButton onClick={memberInsert}>가입</BButton>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default Signup;
