import axios from "axios";

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "member/jsonemberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptListDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "dept/deptList", //스프링쪽이라서 뒤에 DB안붙임
        params: dept, //쿼리스트링은 header에 담김 -get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const jsonMemberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "member/jsonMemberListDB",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptInsertDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "dept/deptInsert",
        data: dept, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deptUpdateDB = (dept) => {
  return new Promise((resolve, reject) => {
    console.log(dept);
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "dept/deptUpdate",
        data: dept, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "dept/deptDelete",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
