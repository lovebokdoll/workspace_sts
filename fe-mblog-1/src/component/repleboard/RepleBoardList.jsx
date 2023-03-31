import React, { useEffect, useState } from "react";
import { qnaListDB } from "../../service/dbLogic";
import RepleBoardRow from "./RepleBoardRow";
//고려할 사항 ? 상위컴포넌트에서 하위컴포넌트만 props전달이 가능함!
//일반적으로는 가급적 상위컴포넌트에 두는 것을 추천함

const RepleBoardList = () => {
  const [board, setBoard] = useState({});
  const [boards, setBoards] = useState([{}]);
  useEffect(() => {
    const qnaList = async () => {
      //요청
      const res = await qnaListDB(board);
      console.log(res.data);
      setBoards(res.data);
    };
    qnaList();
  }, [board]);

  return (
    <>
      {boards &&
        boards.map((item, index) => <RepleBoardRow key={index} item={item} />)}
    </>
  );
};

export default RepleBoardList;
