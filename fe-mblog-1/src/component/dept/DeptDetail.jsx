import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import BlogFooter from "../include/BlogFooter";
import BlogHeader from "../include/BlogHeader";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { deptDeleteDB, deptListDB, deptUpdateDB } from "../../service/dbLogic";
import { MyInput, MyLabel, MyLabelAb } from "../style/FormStyle";
import { validateDname } from "../../service/validateLogic";
import ImageUploader from "../../service/imageUploader";
/**
 * style
 */
const DivDeptBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;
const DivUploadImage = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeptDetail = ({ imageuploader }) => {
  const [files, setFiles] = useState({ filename: null, fileurl: null });
  const [show, setShow] = useState(false);
  const [dname, setDname] = useState("");
  const [loc, setLoc] = useState("");
  const navigate = useNavigate("");
  const { deptno } = useParams(); //app.jsx의 Routh Path에서 해시값으로 넘어 온다. -> 바뀐다.
  const [comment, setComment] = useState({
    deptno: "",
    dname: "",
    loc: "",
  });
  const [star, setStar] = useState({
    deptno: "*",
    dname: "*",
    loc: "",
  });

  const validate = (key, e) => {
    console.log("validate:" + key);
    let result;
    if (key === "dname") {
      result = validateDname(e);
    }
    setComment({ ...comment, [key]: result });
    if (result) {
      if (result == "") {
        setStar({ ...star, [key]: "" });
      } else {
        setStar({ ...star, [key]: "*" });
      }
    } else {
      setStar({ ...star, [key]: "" });
    }
  };
  const handleClose = () => setShow(false);

  /**
   * insert
   * 수정화면모달 마운트(화면에 나타남)여부결정 - false이면 안보임, true이면 보임
   */
  const handleShow = () => {
    setShow(true);
  };

  /**
   * update
   * 스프링부트와 리액트 연동하기 - @RequestBody를 사용해서 JSON포맷으로 넘기는 컨셉
   */
  const deptUpdate = async () => {
    const dept = {
      deptno,
      dname,
      loc,
      filename: files.filename,
      fileurl: files.fileurl,
    };
    const res = await deptUpdateDB(dept);
    if (!res.data) {
      console.log("부서등록에 실패하였습니다");
    } else {
      console.log("부서등록에 성공하였습니다.");
      //성공시 부서목록 새로고침 처리할것 - window.location.reload()쓰지말것 -SPA컨벤션
      //useEffect - 의존성배열을 연습할 수 있음
      handleClose();
      //부서목록 새로고침 퍼리
      navigate("/dept/1");
    }
  };

  /**
   * delete
   */
  const deptDelete = () => {
    console.log("삭제");
    const acynDB = async () => {
      const res = await deptDeleteDB({ deptno: deptno });
      console.log(res.data);
      navigate("/dept/1");
    };
    acynDB();
  };

  /**
   * detail
   * 부서번호를 클릭 했을때 해시값으로 전달된 부서번호를 담아줌
   * 사용자가 부서번호를 선택할 때마다 변경되니까 useEffect에서 의존배열인자로 사용함
   */
  //오라클서버에서 파라미터로 넘어온 부서번호를 가지고 한 건을 조회한 후에 담기
  const [dept, setDept] = useState({
    DEPTNO: 0,
    DNAME: "",
    LOC: "",
    FILENAME: "",
    FILEURL: "",
  });

  useEffect(() => {
    //파라미터로 넘어오는 deptno가 바뀌면 다시 실행됨
    const asyncDB = async () => {
      const res = await deptListDB({ deptno: deptno });
      console.log(res.data); //0번방에 뭐가 있는지 찍어봄
      const result = JSON.stringify(res.data);
      console.log(result);
      const jsonDoc = JSON.parse(result);
       console.log(jsonDoc)
      setDept({
        DEPTNO: jsonDoc[0].DEPTNO,
        DNAME: jsonDoc[0].DNAME,
        LOC: jsonDoc[0].LOC,
        FILENAME: jsonDoc[0].FILENAME,
        FILEURL: jsonDoc[0].FILEURL,
      });
    };
    asyncDB();
  }, [deptno]);
  if (!dept.FILEURL) {
    dept.FILEURL = "http://via.placeholder.com/200X250";
  }

  /**
   * 부서목록페이지이동
   */
  const deptList = () => {
    navigate("/dept/0");
  };

  /*
  react에서는 메모이제이션 컨벤션이 있다.
  useMemo와 useCallback이 있다 
  차이점 :  useMemo는 값을 반환하고 useCallback은 함수를 반환함
  리렌더링은 언제 일어나나용
  1.state변경
  2.props변경
  3.부모컴포넌트가 변경  
  */

  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, []);

  /**
   * 함수의 구현내용에 변화가 없는 경우라면 주소번지를 그대로 가지고 있어도 된다 -useCallback
   */
  const handleLoc = useCallback((value) => {
    console.log(value);
    setLoc(value);
  }, []);
  /**
   * imgChange - 이미지 파일첨부
   * @param {*} event
   * @returns
   */
  const imgChange = async (event) => {
    const uploaded = await ImageUploader.upload(event.target.files[0]);
    setFiles({
      filename: uploaded.public_id + "." + uploaded.format,
      fileurl: uploaded.url,
    });
    //input의 이미지 객체 얻어오기 - 미리보기
    const upload = document.querySelector("#dimg");
    //이미지를 집어넣을 곳의 부모태그
    const holder = document.querySelector("#uploadImg");
    const file = upload.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      if (img.width > 150) {
        img.width = 150;
      }
      holder.innerHTML = "";
      holder.appendChild(img);
    };
    reader.readAsDataURL(file);
    return false;
    //console.log(uploaded);
  };

  return (
    <>
      <BlogHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "58rem" }}>
          <Card.Body>
            <Card.Img
              style={{ width: "250px" }}
              src={`${dept.FILEURL}`}
              alt="Card image"
            />
            <DivDeptBody>
              <Card.Title>{dept.DNAME}</Card.Title>
              <Card.Text>{dept.LOC}</Card.Text>
              <Card.Text>{dept.DEPTNO}</Card.Text>
            </DivDeptBody>
          </Card.Body>
          <div>
            <Button onClick={handleShow}>수정</Button>
            &nbsp;
            <Button onClick={deptDelete}>삭제</Button>
            &nbsp;
            <Button onClick={deptList}>부서목록</Button>
          </div>
        </Card>
      </div>

      {/* ========================== [[ 부서정보수정화면 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <MyLabel>
                부서번호<span style={{ color: "violet" }}>{star.deptno}</span>
                <MyInput
                  type="text"
                  id="deptno"
                  name="deptno"
                  placeholder="Enter 부서번호"
                  value={deptno}
                />
                <MyLabelAb>{comment.deptno}</MyLabelAb>
              </MyLabel>
            </div>
            <div style={{ display: "flex" }}>
              <MyLabel>
                부서명<span style={{ color: "violet" }}>{star.dname}</span>
                <MyInput
                  type="text"
                  id="dname"
                  name="dname"
                  placeholder="Enter 부서명"
                  onChange={(e) => {
                    handleDname(e.target.value);
                    validate("dname", e);
                  }}
                />
                <MyLabelAb>{comment.dname}</MyLabelAb>
              </MyLabel>
            </div>
            <div style={{ display: "flex" }}>
              <MyLabel>
                지역<span style={{ color: "violet" }}>{star.dname}</span>
                <MyInput
                  type="text"
                  id="loc"
                  name="loc"
                  placeholder="Enter 지역"
                  onChange={(e) => {
                    handleLoc(e.target.value);
                  }}
                />
                <MyLabelAb>{comment.loc}</MyLabelAb>
              </MyLabel>
            </div>

            <Form.Group className="mb-3" controlId="formBasicOffice">
              <Form.Label>건물이미지</Form.Label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                id="dimg"
                name="dimg"
                onChange={imgChange}
              />
            </Form.Group>
            <DivUploadImage id="uploadImg">
              <Img src="http://via.placeholder.com/200X250" alt="미리보기" />
            </DivUploadImage>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptUpdate}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 부서정보수정화면 Modal ]] ========================== */}

      <BlogFooter />
    </>
  );
};

export default DeptDetail;
