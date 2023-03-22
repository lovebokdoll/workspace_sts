export const validateDname = (e) => {
  //사용자가 입력한 부서명
  const name = e.target.value; //input onChange
  const kor = /^[가-힣]+$/;
  const eng = /^[a-zA-Z]+$/;
  if (name.length === 0) {
    return " ";
  } else if (kor.test(name) || eng.test(name)) {
    return "";
  } else {
    return "부서명은 영어 또는 한글로만 가능합니다.";
  }
};
