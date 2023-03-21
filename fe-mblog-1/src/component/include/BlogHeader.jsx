import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const BlogHeader = () => {
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
            <Link to="/dept" className="nav-link">
              부서관리
            </Link>
            <Link to="/board" className="nav-link">
              게시판
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default BlogHeader;
