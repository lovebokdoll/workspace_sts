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
