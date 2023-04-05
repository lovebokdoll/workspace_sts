import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { sendSignInLinkToEmail } from "firebase/auth";
import { logout } from "../../service/authLogic";
const BlogHeader = ({ authLogic }) => {
  const navigate = useNavigate();
  const auth = authLogic.getUserAuth();
  //상태훅에 관리하면 화면에 즉시 반영됨
  //인증과 인가를 구분할 수 있다 ->sessionStorage,back-end  구분할 수 있다
  const [email, setEmail] = useState();
  /**
   * 의존성 배열이란?
   * - 빈배열일때는 한번만 호출된다.
   * - 빈배열을 삭제하면 글 하나만 써도 재요청이 일어난다.
   * -useEffet안에 return이 있으면 아래의 return이 렌더링 되지 않는다.
   */
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
    //인터셉트해서 뭔가 전처리가 필요한 경우
    //return()=>{

    //}
  }, []);
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Link to="/" className="nav-link">
            다희네
          </Link>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/dept/0" className="nav-link">
              부서관리
            </Link>
            <Link to="/repleboard" className="nav-link">
              게시판
            </Link>
          </Nav>
          {/*js와 jsx섞어쓰기 , null undefined주의*/}
          {email && (
            <Button
              variant="primary"
              onClick={() => {
                logout(auth);
                navigate("/login");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default BlogHeader;
