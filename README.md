# posting-community 프로젝트

## 개요

- 개인 프로젝트
- 프로젝트 주제: 이미지 게시물 공유 커뮤니티
- 개발 기간: 2021.03.29 ~ 2021.04.01
- React + firebase 사용
- 데이터 베이스: firestore
- 형상관리 툴: git
<hr/>
<br/>

## 프로젝트 특징

- 본 프로젝트는 개인 프로젝트로 이미지 업로드 기능이 있는 커뮤니티 사이트를 React와 서버리스 플랫폼인 firebase를 이용하여 구현
- UI 부분은 styled-components, material-ui를 사용
- 모든 페이지는 PC, 모바일, 태블릿에서 확인했을 때 뷰가 깨지지 않도록 반응형으로 구현
- 컴포넌트 구성: 컴포넌트는 중간단위 및 페이지 단위로 구성했으며 디렉토리로 구분함
- 주요 기능: 로그인, 회원가입 기능, 게시물 추가, 조회, 수정, 삭제, 좋아요 기능, 무한스크롤, 게시물 업로드, 수정 시 레이아웃 설정
- DB구성
- postDB {comment, image_url, insert_dt, like, selectedValue, user_id, user_name}
- likeDB {is_like: 좋아요 여부, post_id: 게시물 id, user_id: 유저아이디}
<hr/>
<br/>

## 상태관리 패키지

- react-redux, redux (+ redux-actions, immer 사용)
- redux-middleware(redux-thunk)
- react-router-dom
<hr/>
<br/>

## 사용 시 주의 사항

- firebase를 연결해서 사용하세요
- 사용법은 다음과 같습니다.
  <hr/>
  <code>
  import firebase from 'firebase/app'; 
    </code>
    <br/>
    <code>
  import 'firebase/firestore';
      </code>
      <br/><br/><br/>
    <code>
  const firebaseConfig = {

  키를 추가하세요
  }; </code><br/><br/>
  <code>
  firebase.initializeApp(firebaseConfig);
  </code>
  <br/>
  <code>
  const firestore = firebase.firestore();
  </code>
  <br/>
  <code>
  export { firestore };
  </code>
