import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BButton } from "../style/FormStyle";
import KhMyFilter from "./KhMyFilter";
const KhSearchBar = () => {
  const [content, setContent] = useState("");
  const [types] = useState(["제목", "내용", "작성자"]);
  const location = useLocation();
  const search = decodeURIComponent(location.search);
  console.log(search);
  const navigate = useNavigate();

  const [tTitle, setTTitle] = useState("제목");

  const handleTTitle = useCallback((e) => {
    //console.log(e);사용자가 선택한 콤보박스명 제목,내용,작성자
    setTTitle(e);
  }, []);

  useEffect(() => {
    console.log("effect");
    search.split("&").forEach((item) => {
      console.log(item);
      if (item.match("condition")) {
        setTTitle(item.split("=")[1]);
      }
    });
  }, [search, setTTitle]);

  const setPath = () => {
    let path;
    //앞에서 조회한 적이 있을 때 기존에 쿼리스트링 삭제 후 다시 쿼리스트링 만들어야 함
    if (search.match("condition")) {
      path =
        location.pathname +
        search
          .replace(
            `&${search.split("&").filter((item) => {
              return item.match("page");
            })}&${search.split("&").filter((item) => {
              return item.match("content");
            })}`,
            `&condition=${tTitle}&content=${content}`
          )
          .replace(
            `&${search.split("&").filter((item) => {
              return item.match("page");
            })}`,
            "&page=1&"
          );
    } else {
      path =
        location.pathname + search + `?condition=${tTitle}&content=${content}`;
    }
    console.log(path); ///qna/list?condition=제목&page=1
    return path;
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <KhMyFilter
        types={types}
        title={tTitle}
        id={"condition"}
        handleTitle={handleTTitle}
      />
      <input
        type="text"
        value={content}
        style={{
          maxWidth: "600px",
          width: "40%",
          height: "40px",
          margin: "0px 10px 0px 10px",
          border: "1px solid lightgray",
          borderRadius: "10px",
        }}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      {/* <div>{setPath()}</div> */}
      <BButton
        style={{ width: "70px", height: "40px", marginRight: "10px" }}
        onClick={() => {
          navigate(setPath());
        }}
      >
        검색
      </BButton>
      <BButton
        style={{ width: "70px", height: "40px" }}
        onClick={() => {
          navigate(`/qna/list?page=1`);
          setContent("");
        }}
      >
        초기화
      </BButton>
    </div>
  );
};

export default KhSearchBar;
