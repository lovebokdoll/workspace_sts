import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
class AuthLogic {
  //클래스선언
  //생성자 - 전역변수 초기화
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    // this.kakaoProvider = new KakaoAuthProvider();
    // this.githubProvider = new GithubAuthProvider();
  }
  getUserAuth = () => {
    return this.auth;
  };
  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };
}
//사용자가 변경되는지 지속적으로 체크하여 변경될 때마다 호출됨 - 구글서버에서 제공하는 거비스
// 콜백함수
export default AuthLogic;
export const onAuthChange = (auth) => {
  return new Promise((resolve) => {
    //비동기서비스 구현
    //사용자가 바뀌었을 때 콜백함수 받음
    auth.onAuthStateChanged((user) => {
      //파라미터 주입
      resolve(user); //내보내지는 정보 - view계층 -App.jsx
    });
  }); // end of Promise
}; // end of onAuthChange

//이메일과 비밀번호로 회원가입 신청을 한 경우 로그인처리하는 함수임. => firebase에서 등록한 아이디 /비밀번호
/**
 *
 * @param {*} auth  - AuthLogic.js생성자 getAuth()-auth =>onAuthChange의 auth와 같음!
 * @param {*} user - email,password를 하나로 묶음
 * @returns
 */
export const loginEmail = (auth, user) => {
  console.log(auth);
  console.log(user.email + user.password);
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(userCredential);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode : " + errorCode);
        console.log("errorMessage : " + errorMessage);
        reject(error);
      });
  });
};

//로그인 시도시 구글인증인지 아니면 깃허브 인증인지 문자열로 넘겨받음
export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider) //팝업열림
      .then((result) => {
        //콜백함수
        const user = result.user; //구글에 등록되어있는 profile정보 담김
        console.log("user ===> ", user);
        resolve(user); //인증된 사용자 프로필 정보도 화면쪽으로 내보냄
      })
      .catch((error) => reject(error));
  });
};

export const signupEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        sendEmail(userCredential.user).then(() => {
          resolve(userCredential.user.uid);
        });
      })
      .catch((e) => reject(e));
  });
};
export const linkEmail = (auth, user) => {
  console.log(auth);
  console.log(auth.currentUser);
  console.log(user);
  return new Promise((resolve, reject) => {
    console.log(user.email + "," + user.password);
    const credential = EmailAuthProvider.credential(user.email, user.password);
    console.log(credential);
    console.log(auth.currentUser.uid);
    resolve(auth.currentUser.uid);
    /* 인증정보가 다른 사용자 계정에 이미 연결되어 있다면 아래 코드 에러 발생함
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        console.log(usercred);
        const user = usercred.user;
        console.log("Account linking success", user.uid);
        resolve(user.uid);
      })
      .catch((e) => reject(e));
    */
  });
};

export const logout = (auth) => {
  return new Promise((resolve, reject) => {
    auth.signOut().catch((error) => reject(error + " logout error"));
    // 로그인 성공 시 세션 스토리지에 담아둔 정보를 모두 지운다.
    sessionStorage.clear();
    // 서비스를 더 이상 사용하지 않는 경우이고 돌려줄 값이 없기 때문에 파라미터 자리는 비워둔다.
    resolve();
  });
};
export const sendEmail = (user) => {
  return new Promise((resolve, reject) => {
    sendEmailVerification(user)
      .then(() => {
        resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
      })
      .catch((e) => reject(e + ": 인증메일 오류입니다."));
  });
};

export const sendResetpwEmail = (auth, email) => {
  console.log(email);
  return new Promise((resolve, reject) => {
    sendResetpwEmail(auth, email)
      .then(() => {
        resolve("비밀번호 변경 이메일을 보냈습니다.");
      })
      .catch((e) => reject(e + ": 인증메일 오류입니다."));
  });
};
/**
 * LoginPage.jsx
 * 로그인처리
 * 1)이메일, 비번으로 인증하기
 * 2)구글계정으로 인증하기
 * -------------------------------------------------------
 * 오라클 서버에 member230324에서 찾음
 * 구글계정으로 발급된 userId가 있는 회원정보가 있는지 체크하기
 * 있으면 List<Map>
 * 서비스를 하는데 유지해야할 정보를 sessionStorage에 저장한다
 * 없으면 0 - 해당 구글계정은 회원가입을 부탁드립니다.띄우기
 */
