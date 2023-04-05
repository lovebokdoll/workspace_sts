import axios from "axios";

export const qnaListDB = (board) => {
  //axios -비동기요청처리 ajax-fetch(브라우저) -axios(NodeJS-oracle서버연동)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        //3000번 서버에서 8000번 서버로 요청을 함 - 네트워크(다른서버) =>CORS이슈!
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "reple/qnaList",
        params: board, //get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const qnaUpdateDB = (board) => {
  console.log(board);
  //대소문자 구분 어떻게 할것인가
  //파라미터는 소문자로 리턴값은 대문자로 아니면  둘다 대문자?
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "reple/qnaUpdate",
        data: board, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const qnaDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "reple/qnaDelete",
        params: board, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const qnaInsertDB = (board) => {
  console.log(board); //fileNames=['man1.png','man2.png','man3.png']
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "reple/qnaInsert",
        data: board, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const qnaDetailDB = (board) => {
  console.log(board); //QNA_BNO,qna_bno const obj={QNA_BNO:29}
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "reple/qnaDetail",
        params: board, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPTING_IP + "reple/fileUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPTING_IP + "reple/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "member/memberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "member/memberInsert",
        data: member, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member);
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPTING_IP + "member/memberUpdate",
        data: member, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "member/memberDelete",
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

export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPTING_IP + "dept/deptDelete",
        params: dept,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const boardInsertDB = (bm_no) => {};
