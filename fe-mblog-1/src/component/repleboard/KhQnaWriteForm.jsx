import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import BlogFooter from "../include/BlogFooter";
import BlogHeader from "../include/BlogHeader";
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";
import QuillEditor from "./QuillEditor";
import RepleBoardFileInsert from "./RepleBoardFileInsert";
import { qnaInsertDB } from "../../service/dbLogic";
import { useNavigate } from "react-router-dom";
import KhMyFilter from "./KhMyFilter";
const KhQnAWriteForm = ({ authLogic }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //내용작성
  const [secret, setSecret] = useState(false); //비밀글
  const [tTitle, setTTitle] = useState("일반"); //qna_type
  const [types] = useState(["일반", "결제", "양도", "회원", "수업"]); //qna_type의 라벨 값
  const [files, setFiles] = useState([]); //파일처리
  const quillRef = useRef();

  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      if (!content.match(files[i])) {
        console.log(files);
        setFiles(files.filter((file) => file != files[i]));
      }
    }
  }, [content, setFiles, files]);

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleFiles = useCallback(
    (value) => {
      setFiles([...files, value]); //깊은복사
    },
    [files]
  );

  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  }, []);

  const qnaInsert = async () => {
    //post
    console.log("qnaInsert");
    console.log(secret);
    console.log(typeof secret); //blooean 타입출력
    const board = {
      qna_title: title,
      qna_content: content,
      qna_secret: secret ? "true" : "false", //문자열로
      qna_type: tTitle,
      mem_no: sessionStorage.getItem("no"),
      fileNames: files,
    }; //사용자가 입력한 값 넘기기 - @RequestBody로 처리됨
    const res = await qnaInsertDB(board);
    console.log(res.data);
    //성공시 페이지 이동처리
    window.location.replace("/qna/list?page=1");
    // navigate("/qna/list");
  };

  return (
    <>
      <BlogHeader authLogic={authLogic} />
      <ContainerDiv>
        <HeaderDiv>
          <h3>QNA 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{ width: "100%", maxWidth: "2000px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h2>제목</h2>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "10px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>비밀글</span>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    style={{ paddingLeft: "46px" }}
                    onClick={() => {
                      setSecret(!secret);
                    }}
                  />
                </div>
                <KhMyFilter
                  title={tTitle}
                  types={types}
                  handleTitle={handleTTitle}
                ></KhMyFilter>
                <BButton
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    qnaInsert();
                  }}
                >
                  글쓰기
                </BButton>
              </div>
            </div>
            <input
              id="dataset-title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
              }}
              onChange={(e) => {
                handleTitle(e.target.value);
              }}
            />
            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <h3>상세내용</h3>
            <QuillEditor
              value={content}
              handleContent={handleContent}
              quillRef={quillRef}
              files={files}
              handleFiles={handleFiles}
            />
            <RepleBoardFileInsert files={files} />
          </div>
        </FormDiv>
      </ContainerDiv>
      <BlogFooter />
    </>
  );
};

export default KhQnAWriteForm;
