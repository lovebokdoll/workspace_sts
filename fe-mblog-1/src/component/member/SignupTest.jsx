/*global daum*/
import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { memberInsertDB } from "../../service/dbLogic";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";

//회원가입페이지
const SignupTest = () => {
  const navigate = useNavigate("");
  const [mem_uid, setMemuid] = useState("");
  const [mem_pw, setMempw] = useState("");
  const [mem_name, setMemname] = useState("");
  const [mem_nickname, setMemnickname] = useState("");
  const [mem_email, setMememail] = useState("");
  const [mem_tel, setMemtel] = useState("");
  const [mem_gender, setMemgender] = useState("");
  const [mem_birthday, setMembirthday] = useState("");
  const [mem_zipcode, setMemzipcode] = useState("");
  const [mem_addr, setMemaddr] = useState("");
  const [mem_addr_dtl, setMemaddrdtl] = useState("");
  const [post, setPost] = useState({
    zipcode: "",
    addr: "",
    addrDetail: "",
  });

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
      mem_zipcode,
      mem_addr,
      mem_addr_dtl,
    };
    console.log(member);
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
  const handleZipcode = useCallback((e) => {
    setMemzipcode(e);
  }, []);
  const handleAddr = useCallback((e) => {
    setMemaddr(e);
  }, []);
  const handleAddrdtl = useCallback((e) => {
    setMemaddrdtl(e);
  }, []);
  const clickAddr = (e) => {
    e.preventDefault();
    new daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        if (data.userSelectedType === "R") {
          addr = data.roadAddress; //도로명
        } else {
          addr = data.jibunAddress; //지번
        }
        console.log(data); //전체주소정보
        console.log(addr); //주소정보만
        setPost({ ...post, zipcode: data.zonecode, addr: addr });
        document.querySelector("#mem_zipcode").value = data.zonecode; //화면에 자동으로 입력처리
        document.querySelector("#mem_addr").value = addr;
        document.querySelector("#mem_addr_dtl").focus(); //addr이 입력되었을때
        setMemzipcode(document.querySelector("#mem_zipcode").value);
        setMemaddr(document.querySelector("#mem_addr").value);
      },
    }).open();
  };
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
              <span>아이디</span>
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
              <span>비밀번호</span>
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
              <span>이름</span>
            </div>
            <input
              id="mem_name"
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
              <span>닉네임</span>
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
              <span>💌이메일</span>
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
              <span>전화번호</span>
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
              <span>성별</span>
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
              <span>생년월일</span>
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
              <span>우편번호</span>
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
              onChange={(e) => {
                handleZipcode(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span>주소</span>
            </div>
            <input
              id="mem_addr"
              type="text"
              maxLength="50"
              placeholder="주소를 입력하세요."
              readOnly={post.addr ? false : true}
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleAddr(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span>상세주소</span>
            </div>
            <input
              id="mem_addr_dtl"
              type="text"
              maxLength="50"
              placeholder="상세주소를 입력하세요."
              readOnly={post.addr ? false : true}
              style={{
                width: "200px",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleAddrdtl(e.target.value);
              }}
            />
            <Button onClick={clickAddr}>주소검색</Button>
            <BButton onClick={memberInsert}>가입</BButton>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default SignupTest;
